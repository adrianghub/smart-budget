import { Button } from "@/components/ui/button";
import { useConfirm } from "@/lib/hooks/use-confirm";
import type { Table } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteBulkActionButton = ({
  disabled,
  table,
  onClick,
}: {
  disabled?: boolean;
  table: Table<any>;
  onClick: () => void;
}) => {
  const { pending } = useFormStatus();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action will delete all selected items."
  );

  return (
    <>
      <Button
        size='sm'
        variant='outline'
        className='ml-auto font-normal text-xs'
        disabled={pending || !!disabled}
        onClick={async () => {
          const confirmed = await confirm();
          if (confirmed) {
            onClick();
          }
        }}
      >
        <TrashIcon className='size-4 mr-2' />
        Delete ({table.getFilteredSelectedRowModel().rows.length})
      </Button>
      <ConfirmDialog />
    </>
  );
};
