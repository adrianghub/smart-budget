"use client";

import {addExpenseAction} from "@/app/(main)/expanses/_actions/addExpanseAction";
import {expanseSchema} from "@/app/(main)/expanses/_schemas/expanseSchema";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@radix-ui/react-label";
import {useFormState} from "react-dom";
import {useForm} from "react-hook-form";
import type {z} from "zod";

export const ExpanseForm = () => {
  const [state, formAction] = useFormState(addExpenseAction, {
    message: "",
  });

  const form = useForm<z.infer<typeof expanseSchema>>({
    resolver: zodResolver(expanseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: {
        value: "",
        label: "",
      },
      issueDate: new Date(),
      fvRefUrl: "",
      status: {
        value: "",
        label: "",
      },
    },
  });

  return (
    <form action={formAction}>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Add Expanse</h1>
            <p className='text-balance text-muted-foreground'>
              Add a new expanse to your budget
            </p>
          </div>
          <div className='grid gap-4'>
            <form className='grid gap-2' action={formAction}>
              <Label htmlFor='title'>Title:</Label>
              <Input id='title' name='title' type='text' required />
              <Label htmlFor='amount'>Amount:</Label>
              <Input id='amount' name='amount' type='number' required />
              <Label htmlFor='category'>Category:</Label>
              <Input id='category' name='category' type='text' required />
              <Label htmlFor='issueDate'>Issue Date:</Label>
              <Input id='issueDate' name='issueDate' type='date' required />
              <Label htmlFor='fvRefUrl'>FV:</Label>
              <Input id='fvRefUrl' name='fvRefUrl' type='text' required />
              <Label htmlFor='status'>Status:</Label>
              <Input id='status' name='status' type='text' required />
              <Button type='submit' className='w-full'>
                Add Expanse
              </Button>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};
