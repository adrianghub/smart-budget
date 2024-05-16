"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import {
  transactionInsertSchema,
  transactions,
  wallets,
  type Transaction,
} from "@/db/schema";
import { deleteObjectFromBucket } from "@/lib/s3/deleteObjectFromBucket";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteBulkTransactions(
  prevState: {
    success?: boolean;
    issues?: string[];
  },
  data: Transaction[]
) {
  const userSession = await auth();
  const userId = userSession?.user?.id;

  if (!userId) {
    return {
      issues: ["User not found"],
    };
  }

  const parsed = transactionInsertSchema.safeParse(
    data.filter(Boolean).map((transaction) => ({
      ...transaction,
      statusId: transaction.statusId,
      categoryId: transaction.categoryId,
    }))[0]
  );

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  data.forEach(async (transaction) => {
    const { id } = transaction;
    const transactionToDelete = db.$with("transactions_to_delete").as(
      db
        .select({ id: transactions.id })
        .from(transactions)
        .innerJoin(wallets, eq(transactions.walletId, wallets.id))
        .where(and(eq(transactions.id, id), eq(wallets.userId, userId)))
    );

    await db
      .with(transactionToDelete)
      .delete(transactions)
      .where(eq(transactions.id, sql`(select id from ${transactionToDelete})`));

    if (transaction.fv_ref_url) {
      const response = await deleteObjectFromBucket(transaction.fv_ref_url);

      if (!response.success) {
        throw new Error("Error deleting object from bucket");
      }
    }
  });

  revalidatePath("/transactions");

  return {
    success: true,
    issues: [],
  };
}
