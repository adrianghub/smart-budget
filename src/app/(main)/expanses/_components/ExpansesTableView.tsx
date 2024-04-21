import {expanseStatuses} from "@/app/(main)/_data-layer/expanse-statuses-mock";
import type {Expanse} from "@/app/(main)/_data-layer/expanses";
import {expanses} from "@/app/(main)/_data-layer/expanses-mock";
import {ExpansesTable} from "@/app/(main)/expanses/_components/ExpansesTable";
import {Button} from "@/components/ui/button";

async function getData(): Promise<Expanse[]> {
  // await sleep(300);
  return Promise.resolve(expanses).then((data) => {
    return data.map((exp) => ({
      ...exp,
      status: expanseStatuses
        .map((status) => ({
          label: status.label,
          value: status.value.toLowerCase(),
        }))
        .find((status) => status.value === exp.status.toLowerCase())!,
    }));
  });
}

export const ExpansesTableView = async () => {
  const data = await getData();

  return (
    <>
      {data.length ? (
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
