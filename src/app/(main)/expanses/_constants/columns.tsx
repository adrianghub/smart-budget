import type {Expanse} from "@/app/(main)/_data-layer/expanses";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<Expanse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
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
  },
  {
    accessorKey: "fvRefUrl",
    header: "FV",
    cell: ({row}) => {
      const fv = row.getValue("fvRefUrl") as string;

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
];
