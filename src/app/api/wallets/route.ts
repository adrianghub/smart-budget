export async function GET() {
  // try {
  //   const supabase = createClient();
  //   const userSession = await supabase.auth.getUser();
  //   const userId = userSession.data.user?.id;

  //   if (!userId) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  //   const walletsData = await db.select().from(wallets);
  //   const walletsCount = await db
  //     .select({ count: count() })
  //     .from(wallets)
  //     .where(eq(wallets.userId, userId));

  //   return new Response(
  //     JSON.stringify({ data: walletsData, count: walletsCount }),
  //     {
  //       headers: { "content-type": "application/json" },
  //     }
  //   );
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return new Response(error.message, { status: 500 });
  //   }
  // }

  return new Response("Not implemented", { status: 501 });
}
