import type {ExpanseStatus} from "@/app/(main)/_data-layer/expanse/expanse-statuses-mock";
import {
  type Expanse,
  type ExpanseCategory,
} from "@/app/(main)/_data-layer/expanse/expanses";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DataTableColumnHeader} from "@/components/ui/table/data-table-column-header";
import {ColumnDef} from "@tanstack/react-table";
import {
  Check,
  Clock12Icon,
  MoreHorizontal,
  XSquareIcon,
  type LucideIcon,
} from "lucide-react";

export const statusIcons: Record<ExpanseStatus["value"], LucideIcon> = {
  paid: Check,
  unpaid: XSquareIcon,
  pending: Clock12Icon,
} as const;

export const columns: ColumnDef<Expanse>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: unknown) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label='Select all'
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: unknown) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
  },
  {
    accessorKey: "category",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({row}) => {
      const category = row.getValue("category") as ExpanseCategory;

      if (!category) {
        return null;
      }

      return <span>{category.label}</span>;
    },
    sortingFn: (rowA, rowB) => {
      const categoryA = rowA.getValue("category") as ExpanseCategory;
      const categoryB = rowB.getValue("category") as ExpanseCategory;

      if (!categoryA || !categoryB) {
        return 0;
      }

      return categoryA.label.localeCompare(categoryB.label);
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(amount);

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    sortingFn: "datetime",
  },
  {
    accessorKey: "fvRefUrl",
    header: "FV",
    cell: ({row}) => {
      const fv = row.getValue("fvRefUrl") as string;

      if (!fv) {
        return null;
      }

      return (
        <a
          href={fv}
          target='_blank'
          rel='noreferrer'
          className='underline capitalize cursor-pointer'
        >
          LINK
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue("status") as ExpanseStatus;

      if (!status) {
        return null;
      }

      const Icon = statusIcons[status.value];

      return (
        <div className='flex gap-4 items-center'>
          <Icon className='h-5 w-5' />
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as ExpanseStatus).value);
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View expanse details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
