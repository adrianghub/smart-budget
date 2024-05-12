import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteActionButton = ({
  disabled,
  table,
  onClick,
}: {
  disabled?: boolean;
  table: Table<any>;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      size='sm'
      variant='outline'
      className='ml-auto font-normal text-xs'
      disabled={pending || !!disabled}
      onClick={onClick}
    >
      <TrashIcon className='size-4 mr-2' />
      Delete ({table.getFilteredSelectedRowModel().rows.length})
    </Button>
  );
};
