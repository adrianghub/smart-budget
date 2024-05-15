"use server";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { getBucketSignedUrl } from "@/app/(main)/transactions/_actions/getBucketSignedUrl";
import { expanseSchema } from "@/app/(main)/transactions/_schemas/expanseSchema";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

async function computeSHA256(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function addExpenseAction(
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

  const { title, amount, category, issueDate, status, file } = parsed.data;

  const { data: expanse, error } = await supabase
    .from("expenses")
    .insert([
      {
        title,
        user_id: userId,
        amount,
        category,
        issue_date: new Date(issueDate).toISOString().split("T")[0],
        fv_ref_url: null,
        status: status.toUpperCase(),
      },
    ])
    .select()
    .returns<Expanse[]>();

  if (error) throw new Error(error.message);

  if (file && file.size > 0) {
    try {
      const checksum = await computeSHA256(file);
      const signedUrlResult = await getBucketSignedUrl(
        file.type,
        file.size,
        checksum
      );

      if (signedUrlResult.failure !== undefined) {
        console.error(signedUrlResult.failure);
        throw new Error(signedUrlResult.failure);
      }

      const data = await fetch(signedUrlResult.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const fvRefUrl = data.url.split("?")[0];

      const { error } = await supabase
        .from("expenses")
        .update({
          fv_ref_url: fvRefUrl,
        })
        .eq("id", expanse[0].id);

      if (error) throw new Error(error.message);
    } catch (error) {
      console.error(error);
    }
  }

  revalidatePath("/transactions");

  return {
    success: true,
    issues: [],
  };
}
