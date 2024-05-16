"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { transactionInsertSchema, transactions, wallets } from "@/db/schema";
import { getBucketSignedUrl } from "@/lib/s3/getBucketSignedUrl";
import { computeSHA256 } from "@/lib/utils/computeSH256";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTransactionAction(
  id: string,
  prevState: {
    success?: boolean;
    issues?: string[];
  },
  formData: FormData
) {
  const userSession = await auth();
  const userId = userSession?.user?.id;

  if (!userId) {
    return {
      issues: ["User not found"],
    };
  }

  const data = Object.fromEntries(formData);
  const parsed = transactionInsertSchema.safeParse(data);

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const transactionToUpdate = db.$with("transactions_to_update").as(
    db
      .select({ id: transactions.id })
      .from(transactions)
      .innerJoin(wallets, eq(transactions.walletId, wallets.id))
      .where(and(eq(transactions.id, id), eq(wallets.userId, userId)))
  );

  const updatedTransaction = await db
    .with(transactionToUpdate)
    .update(transactions)
    .set(parsed.data)
    .where(eq(transactions.id, id))
    .returning();

  const { file, fv_ref_url } = parsed.data;

  if (file && file.size > 0 && !fv_ref_url) {
    try {
      const checksum = await computeSHA256(file);
      const signedUrlResult = await getBucketSignedUrl(
        file.type,
        file.size,
        checksum
      );

      if (signedUrlResult.failure !== undefined) {
        console.error(signedUrlResult.failure);
        throw new Error(signedUrlResult.failure);
      }

      const data = await fetch(signedUrlResult.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const fvRefUrl = data.url.split("?")[0];

      await db
        .update(transactions)
        .set({ fv_ref_url: fvRefUrl })
        .where(eq(transactions.id, updatedTransaction[0].id));
    } catch (error) {
      console.error(error);
    }
  }

  revalidatePath("/transactions");

  return {
    success: true,
    issues: [],
  };
}
