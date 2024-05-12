import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

// TODO: add server side pagination, filtering and sorting

export async function GET(request: NextRequest) {
  // const searchParams = request.nextUrl.searchParams;
  // const page = parseInt(searchParams.get("page") || "1");
  // const pageSize = parseInt(searchParams.get("pageSize") || "10");
  // const sortField = searchParams.get("sortField");
  // const sortOrder = searchParams.get("sortOrder") || "asc";
  // const filterBy = searchParams.get("filterBy")
  //   ? JSON.parse(searchParams.get("filterBy")!)
  //   : {};

  const supabase = createClient();
  const query = supabase.from("expenses").select("*", { count: "exact" });
  // .range((page - 1) * pageSize, page * pageSize - 1);

  // if (sortField) {
  //   query = query.order(sortField, {ascending: sortOrder === "asc"});
  // }

  // Object.entries(filterBy).forEach(([key, value]) => {
  //   query = query.ilike(key, `%${value}%`);
  // });

  const { data, error, count } = await query;

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ data, count }), {
    headers: { "content-type": "application/json" },
  });
}
