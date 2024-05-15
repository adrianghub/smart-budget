import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { categories, transactions, wallets } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userSession = await auth();
  const userId = userSession?.user?.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const transactionsData = await db
    .select({
      id: transactions.id,
      title: transactions.title,
      amount: transactions.amount,
      payee: transactions.payee,
      notes: transactions.notes,
      issue_date: transactions.issue_date,
      fv_ref_url: transactions.fv_ref_url,
      status: transactions.status,
      categoryId: transactions.categoryId,
      walletId: transactions.walletId,
    })
    .from(transactions)
    .innerJoin(wallets, eq(transactions.walletId, wallets.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(and(eq(transactions.id, params.id), eq(wallets.userId, userId)));

  if (!transactionsData.length) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify({ data: transactionsData }), {
    headers: { "content-type": "application/json" },
  });
}
