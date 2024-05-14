"use client";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { deleteBulkTransactions } from "@/app/(main)/transactions/_actions/deleteTransactions";
import { DeleteBulkActionButton } from "@/components/DeleteBulkActionButton";
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
  const [state, formAction] = useFormState(deleteBulkTransactions, {
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
    <DeleteBulkActionButton
      table={table}
      disabled={disabled}
      onClick={() => formAction(rows.map((row) => row.original))}
    />
  );
};
