"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import {
  transactionInsertSchema,
  transactions,
  type Transaction,
} from "@/db/schema";
import { getBucketSignedUrl } from "@/lib/s3/getBucketSignedUrl";
import { computeSHA256 } from "@/lib/utils/computeSH256";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addTransactionAction(
  _prevState: {
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
  const parsed = transactionInsertSchema
    .omit({
      id: true,
    })
    .safeParse(data);

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { file } = parsed.data;

  const transaction: Transaction[] = await db
    .insert(transactions)
    .values({
      ...parsed.data,
      id: crypto.randomUUID(),
    })
    .returning();

  if (file && file.size > 0) {
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
        .where(eq(transactions.id, transaction[0].id));
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
