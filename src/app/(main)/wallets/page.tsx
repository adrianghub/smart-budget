import { WalletsTableView } from "@/app/(main)/wallets/_components/WalletsTableView";
import { Suspense } from "react";

export default function WalletsPage() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <h1 className='text-lg font-semibold md:text-2xl'>Wallets</h1>
        </div>
        <div>
          {/* Add new wallet */}
          {/* <AddTransactionHeaderButton /> */}
        </div>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          <Suspense fallback={<div>Loading...</div>}>
            <WalletsTableView />
          </Suspense>
        </div>
      </div>
    </>
  );
}
