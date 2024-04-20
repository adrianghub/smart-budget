import {LoginForm} from "@/app/(auth)/auth/login/_components/LoginForm";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const {data} = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
