"use client";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { TransactionsTableActions } from "@/app/(main)/transactions/_components/TransactionsTableActions";
import { TransactionsTableFilters } from "@/app/(main)/transactions/_components/TransactionsTableFilters";
import { columns } from "@/app/(main)/transactions/_constants/columns";
import { DataTable } from "@/components/ui/table/data-table";
import type { Table } from "@tanstack/react-table";

export const TransactionsTable = ({ data }: { data: Expanse[] }) => (
  <DataTable
    columns={columns}
    data={data}
    renderFilters={(table: Table<Expanse>) => (
      <TransactionsTableFilters table={table} />
    )}
    renderActions={(table: Table<Expanse>, disabled?: boolean) => (
      <TransactionsTableActions table={table} disabled={disabled} />
    )}
  />
);
