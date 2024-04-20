import {ExpansesTable} from "@/app/(main)/expanses/_components/ExpansesTable";
import {displayCurrentMonth} from "@/lib/utils/displayCurrentMonth";
import {Suspense} from "react";

export default async function ExpansesPage() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>Expanses</h1>
        <p>{displayCurrentMonth()}</p>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          <Suspense fallback={<div>Loading...</div>}>
            <ExpansesTable />
          </Suspense>
        </div>
      </div>
    </>
  );
}
