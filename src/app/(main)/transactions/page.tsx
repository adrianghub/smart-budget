import { TransactionsTableView } from "@/app/(main)/transactions/_components/TransactionsTableView";
import { Button } from "@/components/ui/button";
import { displayCurrentMonth } from "@/lib/utils/displayCurrentMonth";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function TransactionsPage() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <h1 className='text-lg font-semibold md:text-2xl'>Transactions</h1>
          <p>{displayCurrentMonth()}</p>
        </div>
        <div>
          <Button variant='outline' size='icon' className='h-8 w-8' asChild>
            <Link href='/transactions/new'>
              <PlusIcon className='h-4 w-4' />
              <span className='sr-only'>Add Transaction</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionsTableView />
          </Suspense>
        </div>
      </div>
    </>
  );
}
