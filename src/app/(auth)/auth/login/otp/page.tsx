import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { InputOTPForm } from "./_components/InputOTPForm";

export default async function LoginPage({
  searchParams: { email },
}: {
  searchParams: { email: string };
}) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/expanses");
  }

  return <InputOTPForm userEmail={email} />;
}
