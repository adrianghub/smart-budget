"use server";

import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {z} from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
  token: z.string({
    invalid_type_error: "Invalid Token",
  }),
});

export async function verifyOtpAction(_prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    token: formData.get("token"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  const {email, token} = validatedFields.data;

  const supabase = createClient();

  const {error} = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error("Error verifying OTP:", error);
    return {
      message: "Error verifying OTP, please try again",
    };
  }

  redirect("/dashboard");
}
