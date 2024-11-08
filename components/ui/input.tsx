import { cn } from "@/lib/utils";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { control, setValue } = useFormContext();
    const {
      field,
      formState: { errors },
    } = useController({
      name: props.name ?? "",
      control,
      defaultValue: props.value ?? "",
    });

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        onChange={e => {
          field.onChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onBlur={field.onBlur}
        // errorMessage={errors[props.name]?.message as string}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
