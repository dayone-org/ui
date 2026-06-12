import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DayoneFieldProps = {
  label: string;
  id: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function DayoneField({
  label,
  id,
  helper,
  disabled,
  className,
  children,
}: DayoneFieldProps) {
  return (
    <div
      className={cn("dayone-field flex flex-col gap-1", className)}
      data-disabled={disabled ? "" : undefined}
    >
      <label htmlFor={id} className="dayone-field__label">
        {label}
      </label>
      <div className="dayone-field__control">{children}</div>
      {helper ? <p className="dayone-field__helper">{helper}</p> : null}
    </div>
  );
}

const inputClassName = "dayone-field__input";

export function DayoneInput({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(inputClassName, className)}
      {...props}
    />
  );
}

export function DayoneTextarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("dayone-field__textarea", className)}
      {...props}
    />
  );
}
