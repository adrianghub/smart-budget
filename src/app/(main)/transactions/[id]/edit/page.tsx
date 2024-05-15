export default async function EditExpansePage({
  params: { id },
}: {
  params: { id: string };
}) {
  // const expanse = await getExpanseData({ id });

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center gap-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>Edit Transaction</h1>
      </div>
      <div className='flex flex-1 rounded-lg border border-dashed shadow-sm'>
        <div className='container mx-auto py-10'>
          {/* <TransactionForm expanse={expanse} /> */}
        </div>
      </div>
    </>
  );
}
