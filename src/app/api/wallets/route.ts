import { auth } from "@/auth";
import { count, eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { wallets } from "../../../db/schema";

export async function GET() {
  try {
    const userSession = await auth();
    const userId = userSession?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const walletsData = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));
    const walletsCount = await db
      .select({ count: count() })
      .from(wallets)
      .where(eq(wallets.userId, userId));

    return new Response(
      JSON.stringify({ data: walletsData, count: walletsCount[0].count }),
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
