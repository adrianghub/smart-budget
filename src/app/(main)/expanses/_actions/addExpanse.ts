"use server";

import type {Expanse} from "@/app/(main)/_data-layer/expanses";
import {createClient} from "@/lib/supabase/server";

export async function addExpense({
  title,
  userId,
  amount,
  category,
  issueDate,
  fvRefUrl,
  status,
}: Expanse) {
  const supabase = createClient();
  const userSession = await supabase.auth.getUser();

  if (!userSession || !userSession.data.user) {
    throw new Error("User not found");
  }

  const {data, error} = await supabase.from("expenses").insert([
    {
      title,
      user_id: userSession.data.user.id,
      amount,
      category,
      issue_date: issueDate,
      fv_ref_url: fvRefUrl,
      status,
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}
