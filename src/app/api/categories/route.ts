import { auth } from "@/auth";
import { count, eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { categories } from "../../../db/schema";

export async function GET() {
  try {
    const userSession = await auth();
    const userId = userSession?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const categoriesData = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId));
    const categoriesCount = await db
      .select({ count: count() })
      .from(categories)
      .where(eq(categories.userId, userId));

    return new Response(
      JSON.stringify({ data: categoriesData, count: categoriesCount[0].count }),
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
