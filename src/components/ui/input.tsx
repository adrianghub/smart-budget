import * as React from "react";

import {cn} from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixAdornment?: JSX.Element;
  suffixAdornment?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, prefixAdornment, suffixAdornment, ...props}, ref) => {
    const hasAdornment = Boolean(prefixAdornment) || Boolean(suffixAdornment);

    return (
      <>
        {hasAdornment ? (
          <div
            className='w-full flex items-center justify-center gap-2 px-3 h-10 rounded-md border border-input bg-transparent ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50'
            data-disabled={props.disabled}
          >
            {prefixAdornment && (
              <div className={cn("text-muted-foreground")}>
                {prefixAdornment}
              </div>
            )}
            <input
              type={type}
              className={cn(
                "flex h-full w-full rounded-md bg-transparent py-2 text-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground shadow-none outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none",
                className
              )}
              ref={ref}
              {...props}
            />
            {suffixAdornment && (
              <div className={cn("text-muted-foreground")}>
                {suffixAdornment}
              </div>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export {Input};
