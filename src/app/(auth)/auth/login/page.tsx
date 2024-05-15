import { LoginForm } from "@/app/(auth)/auth/login/_components/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/transactions");
  }

  return <LoginForm />;
}
