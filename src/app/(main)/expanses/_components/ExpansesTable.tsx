"use client";

import type {Expanse} from "@/app/(main)/_data-layer/expanses";
import {expanses} from "@/app/(main)/_data-layer/expanses-mock";
import {columns} from "@/app/(main)/expanses/_constants/columns";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/ui/data-table";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getData(): Promise<Expanse[]> {
  await sleep(1000);
  return Promise.resolve(expanses);
}

export const ExpansesTable = async () => {
  const data = await getData();

  return (
    <>
      {data.length ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div className='flex flex-col items-center gap-1 text-center w-full h-full justify-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no expanses in current month.
          </h3>
          <p className='text-sm text-muted-foreground'>
            Start by adding a new expanse
          </p>
          <Button className='mt-4'>Add Expanse</Button>
        </div>
      )}
    </>
  );
};
