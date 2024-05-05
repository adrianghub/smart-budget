import {ExpanseForm} from "@/app/(main)/expanses/_components/ExpanseForm";

export default async function NewExpansePage() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>New Expanse</h1>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          <ExpanseForm />
        </div>
      </div>
    </>
  );
}
