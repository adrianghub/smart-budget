"use server";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { deleteObjectFromBucket } from "@/app/(main)/transactions/_actions/deleteObjectFromBucket";
import { expanseSchema } from "@/app/(main)/transactions/_schemas/expanseSchema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteBulkTransactions(
  data: Expanse[],
  prevState: {
    success?: boolean;
    issues?: string[];
  },
  _formData: FormData
) {
  const supabase = createClient();
  const userSession = await supabase.auth.getUser();
  const userId = userSession.data.user?.id;

  if (!userId) {
    return {
      issues: ["User not found"],
    };
  }

  const parsed = expanseSchema.safeParse(
    data.filter(Boolean).map((transaction) => ({
      ...transaction,
      status: transaction.status.value,
      category: transaction.category.value,
    }))[0]
  );

  if (!parsed.success) {
    return {
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  data.forEach(async (transaction) => {
    const { id } = transaction;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    if (transaction.fvRefUrl) {
      const response = await deleteObjectFromBucket(transaction.fvRefUrl);

      if (!response.success) {
        throw new Error("Error deleting object from bucket");
      }
    }
  });

  revalidatePath("/transactions");

  return {
    success: true,
    issues: [],
  };
}
