import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const query = await supabase
    .from("expenses")
    .select()
    .eq("id", params.id)
    .returns<Expanse[]>();

  const { data, error } = query;

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { "content-type": "application/json" },
  });
}
