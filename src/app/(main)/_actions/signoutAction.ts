"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const { error } = await signOut();

  if (error) {
    console.error("Error signing out:", error);
  }

  redirect("/auth/login");
}
