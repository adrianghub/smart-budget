import { AddTransactionHeaderButton } from "@/app/(main)/transactions/_components/AddTransactionHeaderButton";
import { TransactionsTableView } from "@/app/(main)/transactions/_components/TransactionsTableView";
import { displayCurrentMonth } from "@/lib/utils/displayCurrentMonth";
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
          <AddTransactionHeaderButton />
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
