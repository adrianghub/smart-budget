"use client";

import { addTransactionAction } from "@/app/(main)/transactions/_actions/addTransactionAction";
import { updateExpenseAction } from "@/app/(main)/transactions/_actions/updateExpanseAction";
import { SubmitButton } from "@/components/SubmitButton";
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
import { toast } from "@/components/ui/use-toast";
import { transactionInsertSchema, type Transaction } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export const TransactionForm = ({
  transaction,
}: {
  transaction?: Transaction;
}) => {
  const updateExpenseActionWithId = updateExpenseAction.bind(
    null,
    transaction?.id
  );
  const [state, formAction] = useFormState(
    transaction ? updateExpenseActionWithId : addTransactionAction,
    {
      issues: [],
    }
  );

  const form = useForm<Transaction>({
    resolver: zodResolver(transactionInsertSchema),
    defaultValues: {
      title: transaction?.title ?? "",
      amount: transaction?.amount ?? 0,
      categoryId: transaction?.categoryId ?? "",
      issue_date: transaction?.issue_date,
      status: transaction?.status ?? "",
      file: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.success) {
    setTimeout(() => {
      toast({
        title: `Transaction ${transaction ? "updated" : "added"} successfully`,
        description: `${form.getValues("title")} has been ${
          transaction ? "updated" : "added"
        }`,
      });
    });

    redirect("/transactions");
  }

  if (state?.issues?.length > 0) {
    toast({
      title: `Failed to ${transaction ? "edit" : "add"} transaction`,
      description: state?.issues?.join(", "),
    });
    state.issues = [];
  }

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>
            {transaction ? "Edit" : "Add"} Transaction
          </h1>
          <p className='text-balance text-muted-foreground'>
            {transaction ? "Edit" : "Add"} a new transaction to your budget
          </p>
        </div>
        <div className='grid gap-4'>
          <Form {...form}>
            <form
              ref={formRef}
              action={formAction}
              onSubmit={form.handleSubmit((e) => {
                if (formRef?.current) {
                  formAction(new FormData(formRef?.current));
                }
              })}
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
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
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
                      Select a category for your transaction.
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
                      Select a status of your transaction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='issue_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Issue Date</FormLabel>
                    <DatePickerField field={field} />
                    <FormDescription>Date of the transaction.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!transaction && (
                <FormField
                  control={form.control}
                  name='file'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>FV</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          placeholder='Select file'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload FV for the transaction.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <input
                hidden
                name='status'
                value={form.getValues().status}
                readOnly
              />
              <input
                hidden
                name='category'
                value={form.getValues().categoryId!}
                readOnly
              />
              <input
                hidden
                name='issueDate'
                value={form.getValues().issue_date.toISOString().split("T")[0]}
                readOnly
              />
              <SubmitButton text='Submit Transaction' />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
