"use server";

import { getBucketSignedUrl } from "@/app/(main)/expanses/_actions/getBucketSignedUrl";
import { expanseSchema } from "@/app/(main)/expanses/_schemas/expanseSchema";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

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

  const data = Object.fromEntries(formData);
  const parsed = expanseSchema.safeParse(data);

  if (!parsed.success) {
    return {
      data: null,
      message: "",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { title, amount, category, issueDate, status, file } = parsed.data;
  let fvRefUrl = null;

  if (file) {
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

      fvRefUrl = data.url.split("?")[0];
    } catch (error) {
      console.error(error);
    }
  }

  const { data: _expanse, error } = await supabase.from("expenses").insert([
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

  revalidatePath("/expanses");
  redirect("/expanses");
}
