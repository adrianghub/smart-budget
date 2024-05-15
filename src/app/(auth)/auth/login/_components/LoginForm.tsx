"use client";

import { loginAction } from "@/app/(auth)/auth/login/_actions/loginAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export const LoginForm = () => {
  return (
    <div className='flex items-center justify-center py-12'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-balance text-muted-foreground'>
            Enter your email below to receive a magic link
          </p>
        </div>
        <div className='grid gap-4'>
          <form className='grid gap-2' action={loginAction}>
            <Label htmlFor='email'>Email:</Label>
            <Input id='email' name='email' type='email' required />
            <Button type='submit'>Submit Email</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
