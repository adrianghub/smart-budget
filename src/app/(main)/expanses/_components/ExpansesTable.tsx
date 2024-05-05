"use client";

import type {Expanse} from "@/app/(main)/_data-layer/expanse/expanses";
import {ExpanseTableFilters} from "@/app/(main)/expanses/_components/ExpanseTableFilters";
import {columns} from "@/app/(main)/expanses/_constants/columns";
import {DataTable} from "@/components/ui/table/data-table";
import type {Table} from "@tanstack/react-table";

export const ExpansesTable = ({data}: {data: Expanse[]}) => (
  <DataTable
    columns={columns}
    data={data}
    renderFilters={(table: Table<Expanse>) => (
      <div className='py-4'>
        <ExpanseTableFilters table={table} />
      </div>
    )}
  />
);
