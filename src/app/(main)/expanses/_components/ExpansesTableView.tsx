import {ExpansesTable} from "@/app/(main)/expanses/_components/ExpansesTable";
import {Button} from "@/components/ui/button";
import {getExpansesData} from "@/lib/api/handlers";

export const ExpansesTableView = async () => {
  const data = await getExpansesData();

  return (
    <>
      {data.length > 0 ? (
        <ExpansesTable data={data} />
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
