"use server";

import {expanseSchema} from "@/app/(main)/expanses/_schemas/expanseSchema";
import {createClient} from "@/lib/supabase/server";
import type {z} from "zod";

export async function addExpenseAction(
  prevState: {
    message: string;
    data: z.infer<typeof expanseSchema> | null;
    issues?: string[];
  },
  formData: FormData
) {
  const supabase = createClient();
  const userSession = await supabase.auth.getUser();

  if (!userSession || !userSession.data.user) {
    return {
      data: null,
      message: "",
      issues: ["User not found"],
    };
  }

  console.log("formData", formData);

  const data = Object.fromEntries(formData);
  const parsed = expanseSchema.safeParse(data);

  if (!parsed.success) {
    return {
      data: null,
      message: "",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const {title, amount, category, issueDate, status, fvRefUrl} = parsed.data;

  const {data: expanse, error} = await supabase.from("expenses").insert([
    {
      title,
      user_id: userSession.data.user.id,
      amount,
      category,
      issue_date: new Date(issueDate).toISOString().split("T")[0],
      fv_ref_url: fvRefUrl,
      status: status.toUpperCase(),
    },
  ]);

  if (error) throw new Error(error.message);

  return {
    data: expanse,
    message: "Expanse added successfully",
    issues: [],
  };
}
