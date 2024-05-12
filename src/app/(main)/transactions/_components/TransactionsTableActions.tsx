"use client";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { deleteBulkTransactions } from "@/app/(main)/transactions/_actions/deleteTransactions";
import { DeleteActionButton } from "@/components/ui/DeleteActionButton";
import { toast } from "@/components/ui/use-toast";
import type { Table } from "@tanstack/react-table";
import { useFormState } from "react-dom";

export const TransactionsTableActions = ({
  table,
  disabled,
}: {
  table: Table<Expanse>;
  disabled?: boolean;
}) => {
  const rows = table.getFilteredSelectedRowModel().rows;
  const deleteBulkTransactionsWithRows = deleteBulkTransactions.bind(
    null,
    rows.map((row) => row.original)
  );
  const [state, formAction] = useFormState(deleteBulkTransactionsWithRows, {
    issues: [],
  });

  if (state?.success) {
    setTimeout(() => {
      toast({
        title: "Transaction(s) deleted successfully",
        description: `${rows.length} transaction(s) have been deleted`,
      });

      table.resetRowSelection();
    });
  }

  if (state?.issues?.length > 0) {
    setTimeout(() => {
      toast({
        title: "Failed to delete transaction(s)",
        description: state?.issues?.join(", "),
      });
    });
  }

  return (
    <form action={formAction} className='flex items-center justify-between'>
      <DeleteActionButton
        table={table}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          e.currentTarget.form?.requestSubmit();
        }}
      />
    </form>
  );
};
