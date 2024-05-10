"use client";

import { addExpenseAction } from "@/app/(main)/expanses/_actions/addExpanseAction";
import { expanseSchema } from "@/app/(main)/expanses/_schemas/expanseSchema";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/ui/datepicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const ExpanseForm = () => {
  const [state, formAction] = useFormState(addExpenseAction, {
    issues: [],
    message: "",
    data: null,
  });
  const form = useForm<z.infer<typeof expanseSchema>>({
    resolver: zodResolver(expanseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      issueDate: "",
      status: "",
      file: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div>
          {state?.issues?.map((issue) => (
            <p key={issue}>{issue}</p>
          ))}
        </div>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Add Expanse</h1>
          <p className='text-balance text-muted-foreground'>
            Add a new expanse to your budget
          </p>
        </div>
        <div className='grid gap-4'>
          <Form {...form}>
            <form
              ref={formRef}
              action={formAction}
              onSubmit={(e) =>
                form.handleSubmit(() => {
                  e.preventDefault();
                  formRef.current?.submit();
                })
              }
              className='grid gap-4'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Amount'
                        {...field}
                        suffixAdornment={
                          <span className='text-sm text-muted-foreground self-end'>
                            zł
                          </span>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='career'>Career</SelectItem>
                        <SelectItem value='education'>Education</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category for your expanse.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='paid'>Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a status for your expanse.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issueDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Issue Date</FormLabel>
                    <DatePickerField field={field} />
                    <FormDescription>Date of the expense.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>FV</FormLabel>
                    <FormControl>
                      <Input type='file' placeholder='Select file' {...field} />
                    </FormControl>
                    <FormDescription>
                      Upload FV for your expanse.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input
                hidden
                name='status'
                value={form.getValues().status}
                readOnly
              />
              <input
                hidden
                name='category'
                value={form.getValues().category}
                readOnly
              />
              <input
                hidden
                name='issueDate'
                value={form.getValues().issueDate}
                readOnly
              />
              <Button className='w-full mt-4'>Submit Expanse</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
