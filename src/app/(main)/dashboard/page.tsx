import {Button} from "@/components/ui/button";

export default async function DashboardPage() {
  return (
    <>
      <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no expanses in current month
          </h3>
          <p className='text-sm text-muted-foreground'>
            Start by adding a new expanse
          </p>
          <Button className='mt-4'>Add Expanse</Button>
        </div>
      </div>
    </>
  );
}
