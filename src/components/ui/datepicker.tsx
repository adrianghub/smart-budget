"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";

export function DatePickerField<
  T extends { value: string; onChange: (value: Date | undefined) => void }
>({ field }: { field: T }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={new Date(field.value)}
          onSelect={field.onChange}
          disabled={(date) => date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
