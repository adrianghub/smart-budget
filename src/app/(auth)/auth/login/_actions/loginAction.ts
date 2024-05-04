"use server";

import {redirect} from "next/navigation";
import {z} from "zod";

import {createClient} from "@/lib/supabase/server";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
  isNewAccount: z.boolean(),
});

export async function loginAction(_prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    isNewAccount: !!formData.get("isNewAccount"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  const {email, isNewAccount} = validatedFields.data;

  const supabase = createClient();

  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: isNewAccount,
    },
  });

  if (error) {
    console.error("Error sending OTP:", error);
    return {
      message: isNewAccount
        ? "Error with email confirmation, please try again"
        : "Error sending OTP, please try again",
    };
  }

  if (isNewAccount) {
    return {
      message: "Email confirmation sent, please check your inbox",
    };
  }

  redirect("/auth/login/otp?email=" + email);
}
