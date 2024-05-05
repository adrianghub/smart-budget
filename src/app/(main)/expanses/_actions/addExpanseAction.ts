"use server";

import {createClient} from "@/lib/supabase/server";

export async function addExpenseAction(prevState: any, formData: FormData) {
  const supabase = createClient();
  const userSession = await supabase.auth.getUser();

  const title = formData.get("title") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as string;
  const issueDate = formData.get("issueDate") as string;
  const fvRefUrl = formData.get("fvRefUrl") as string;
  const status = formData.get("status") as string;

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
