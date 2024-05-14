import { Button } from "@/components/ui/button";
import { getWalletsData } from "@/lib/api/handlers";
import Link from "next/link";

export const WalletsTableView = async () => {
  const data = await getWalletsData();

  return (
    <>
      {data.length > 0 ? (
        <>{JSON.stringify(data, null, 2)}</>
      ) : (
        <div className='flex flex-col items-center gap-1 text-center w-full h-full justify-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no wallets in current month.
          </h3>
          <p className='text-sm text-muted-foreground'>
            Start by adding a new wallet
          </p>
          <Button className='mt-4' asChild>
            <Link href='/transactions/new'>Add Wallet</Link>
          </Button>
        </div>
      )}
    </>
  );
};
