import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className='h-screen w-full grid place-content-center'>
      <Button asChild>
        <Link href='/transactions'>Go To Transactions</Link>
      </Button>
    </main>
  );
}
