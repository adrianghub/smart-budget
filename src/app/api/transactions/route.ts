import { auth } from "@/auth";
import { parse, subDays } from "date-fns";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { db } from "../../../db/drizzle";
import { categories, transactions, wallets } from "../../../db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const walletId = searchParams.get("walletId");

  const dateDefaultTo = new Date();
  const dateDefaultFrom = subDays(dateDefaultTo, 30);

  const startDate = from
    ? parse(from, "yyyy-MM-dd", dateDefaultFrom)
    : dateDefaultFrom;
  const endDate = to ? parse(to, "yyyy-MM-dd", dateDefaultTo) : dateDefaultTo;

  try {
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
        category: categories.name,
        categoryId: transactions.categoryId,
        wallets: wallets.name,
        walletId: transactions.walletId,
      })
      .from(transactions)
      .innerJoin(wallets, eq(transactions.walletId, wallets.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          walletId ? eq(transactions.walletId, walletId) : undefined,
          eq(wallets.userId, userId),
          gte(transactions.issue_date, startDate),
          lte(transactions.issue_date, endDate)
        )
      )
      .orderBy(desc(transactions.issue_date));

    const transactionsCount = await db
      .select({ count: count() })
      .from(transactions);

    return new Response(
      JSON.stringify({
        data: transactionsData,
        count: transactionsCount[0].count,
      }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
