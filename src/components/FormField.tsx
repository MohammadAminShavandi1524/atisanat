"use client";

import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes, InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface BaseProps {
  label: string;
  containerClassName?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface TextareaProps
  extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

type FormFieldProps = InputProps | TextareaProps;

export const FormField = (props: FormFieldProps) => {
  const {
    label,
    containerClassName,
    error,
    register,
    as = "input",
    className,
    id,
    ...rest
  } = props;

  const fieldId = id ?? register?.name ?? rest.name;
  const errorId = fieldId ? `${fieldId}-error` : undefined;

  return (
    <div
      className={cn("flex min-w-0 flex-col gap-2 sm:gap-3", containerClassName)}
    >
      <div className="flex min-w-0 flex-col items-start gap-1 px-1.5">
        <label
          htmlFor={fieldId}
          className="text-foreground max-w-full text-sm leading-6 font-semibold break-words"
        >
          {label}
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="max-w-full pt-0.5 text-xs break-words text-red-500"
          >
            {error.message}
          </p>
        )}
      </div>

      {as === "textarea" ? (
        <textarea
          id={fieldId}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...(register ?? {})}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "bg-secondary-bg text-foreground placeholder:text-muted-foreground h-30 w-full min-w-0 resize-none rounded-lg border px-3 py-3 text-sm transition-colors outline-none sm:px-4 sm:py-2.5 sm:text-base rtl:text-right",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-foreground/8 focus:border-custom-primary",
            className,
          )}
        />
      ) : (
        <input
          id={fieldId}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          {...(register ?? {})}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "bg-secondary-bg text-foreground placeholder:text-muted-foreground h-11 w-full min-w-0 rounded-lg border px-3 text-sm transition-colors outline-none sm:h-12 sm:px-4 sm:text-base rtl:text-right",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-foreground/8 focus:border-primary",
            className,
          )}
        />
      )}
    </div>
  );
};
