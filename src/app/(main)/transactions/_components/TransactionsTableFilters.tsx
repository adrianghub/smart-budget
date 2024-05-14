"use client";

import type { Expanse } from "@/app/(main)/_data-layer/expanse/expanses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/ui/table/data-table-faceted-filter";
import type { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { expanseStatuses } from "../../../../__mocks__/expanses/expanse-statuses-mock";

export const TransactionsTableFilters = ({
  table,
}: {
  table: Table<Expanse>;
}) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter by title...'
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title='Status'
            options={expanseStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <XIcon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
};
