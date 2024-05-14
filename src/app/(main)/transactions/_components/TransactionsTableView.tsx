import { TransactionsTable } from "@/app/(main)/transactions/_components/TransactionsTable";
import { Button } from "@/components/ui/button";
import { getExpansesData } from "@/lib/api/handlers";
import Link from "next/link";

export const TransactionsTableView = async () => {
  const data = await getExpansesData();

  return (
    <>
      {data.length > 0 ? (
        <TransactionsTable data={data} />
      ) : (
        <div className='flex flex-col items-center gap-1 text-center w-full h-full justify-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no transactions in current month.
          </h3>
          <p className='text-sm text-muted-foreground'>
            Start by adding a new transaction
          </p>
          <Button className='mt-4' asChild>
            <Link href='/transactions/new'>Add Transaction</Link>
          </Button>
        </div>
      )}
    </>
  );
};
