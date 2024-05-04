"use client";

import {loginAction} from "@/app/(auth)/auth/login/_actions/loginAction";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";
import Link from "next/link";
import {useFormState} from "react-dom";

export const RegisterForm = () => {
  const [state, formAction] = useFormState(loginAction, {
    message: "",
  });

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-balance text-muted-foreground'>
            Sign up with email
          </p>
        </div>
        <div className='grid gap-4'>
          <form className='grid gap-2' action={formAction}>
            <Label htmlFor='email'>Email:</Label>
            <Input id='email' name='email' type='email' required />
            <input type='hidden' name='isNewAccount' value={"true"} />
            <Button type='submit' className='w-full'>
              Sign up
            </Button>

            <p aria-live='polite' className='sr-only'>
              {state?.message}
            </p>
          </form>

          <div className='grid gap-2'>
            <p className='text-center text-muted-foreground'>
              Already have an account?{" "}
              <Link
                className='text-balance text-center underline'
                href='/auth/login'
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
