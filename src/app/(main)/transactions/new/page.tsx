import { TransactionForm } from "@/app/(main)/transactions/_components/TransactionForm";

export default async function NewExpansePage() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>New Transaction</h1>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          <TransactionForm />
        </div>
      </div>
    </>
  );
}
