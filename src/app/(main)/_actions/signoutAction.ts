"use server";

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function signOutAction() {
  const supabase = createClient();

  const {error} = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }

  redirect("/auth/login");
}
