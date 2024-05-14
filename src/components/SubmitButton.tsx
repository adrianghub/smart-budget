"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text }: { text?: string }) => {
  const { pending: formPending } = useFormStatus();

  return (
    <Button type='submit' className='w-full mt-4' disabled={!!formPending}>
      {text || "Submit"}
    </Button>
  );
};
