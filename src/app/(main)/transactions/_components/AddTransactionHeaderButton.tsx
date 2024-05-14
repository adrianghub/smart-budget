import { Button } from "@/components/ui/button";
import { getExpansesData } from "@/lib/api/handlers";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const AddTransactionHeaderButton = async () => {
  const data = await getExpansesData();

  if (data.length === 0) {
    return null;
  }

  return (
    <Button variant='outline' size='icon' className='h-8 w-8' asChild>
      <Link href='/transactions/new'>
        <PlusIcon className='h-4 w-4' />
        <span className='sr-only'>Add Transaction</span>
      </Link>
    </Button>
  );
};
