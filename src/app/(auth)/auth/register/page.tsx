import {RegisterForm} from "@/app/(auth)/auth/register/_components/RegisterForm";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function RegisterPage() {
  const supabase = createClient();

  const {data} = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
