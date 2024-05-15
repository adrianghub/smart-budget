"use server";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { expanseSchema } from "@/app/(main)/transactions/_schemas/expanseSchema";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateExpenseAction(
  id: string | undefined,
  prevState: {
    success?: boolean;
    issues?: string[];
  },
  formData: FormData
) {
  const supabase = createClient();
  const userSession = await auth();
  const userId = userSession?.user?.id;

  if (!userId) {
    return {
      issues: ["User not found"],
    };
  }

  const data = Object.fromEntries(formData);
  const parsed = expanseSchema.safeParse(data);

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { title, amount, category, issueDate, status } = parsed.data;

  const { data: _expanse, error } = await supabase
    .from("expenses")
    .update({
      title,
      user_id: userId,
      amount,
      category,
      issue_date: issueDate.split(" GMT")[0],
      fv_ref_url: null,
      status: status.toUpperCase(),
    })
    .eq("id", id)
    .select()
    .returns<Expanse[]>();

  if (error) throw new Error(error.message);

  revalidatePath("/transactions");

  return {
    success: true,
    issues: [],
  };
}
