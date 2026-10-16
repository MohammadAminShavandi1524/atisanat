import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

interface BaseFormFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  containerClassName?: string;
}

type InputProps = BaseFormFieldProps & {
  as?: "input";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

type TextareaProps = BaseFormFieldProps & {
  as: "textarea";
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

export type FormFieldProps = InputProps | TextareaProps;

export const FormField = (props: FormFieldProps) => {
  const errorMessage =
    typeof props.error?.message === "string" ? props.error.message : undefined;

  const errorId = errorMessage ? `${props.register.name}-error` : undefined;

  if (props.as === "textarea") {
    const {
      as: _as,
      label,
      register,
      error: _error,
      containerClassName,
      className,
      ...textareaProps
    } = props;

    return (
      <div className={cn("min-w-0", containerClassName)}>
        <div className="mb-2.5 flex min-h-5 items-center justify-between gap-3 px-2">
          <label
            htmlFor={register.name}
            className="text-foreground min-w-0 truncate text-[14px] font-medium"
          >
            {label}
          </label>

          {errorMessage && (
            <p
              id={errorId}
              role="alert"
              title={errorMessage}
              className="text-destructive max-w-[55%] shrink-0 truncate text-end text-xs"
            >
              {errorMessage}
            </p>
          )}
        </div>

        <textarea
          id={register.name}
          {...textareaProps}
          {...register}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorId}
          className={cn(
            "border-border bg-secondary-bg/35 text-foreground placeholder:text-muted-foreground focus:border-custom-primary min-h-28 w-full resize-y rounded-xl border px-3 py-3 text-[14px] transition-colors duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-4",
            errorMessage && "border-destructive focus:border-destructive",
            className,
          )}
        />
      </div>
    );
  }

  const {
    as: _as,
    label,
    register,
    error: _error,
    containerClassName,
    className,
    ...inputProps
  } = props;

  return (
    <div className={cn("min-w-0", containerClassName)}>
      <div className="mb-2.5 flex min-h-5 items-center justify-between gap-3 px-2">
        <label
          htmlFor={register.name}
          className="text-foreground min-w-0 truncate text-[14px] font-medium"
        >
          {label}
        </label>

        {errorMessage && (
          <p
            id={errorId}
            role="alert"
            title={errorMessage}
            className="text-destructive max-w-[55%] shrink-0 truncate text-end text-xs"
          >
            {errorMessage}
          </p>
        )}
      </div>

      <input
        id={register.name}
        {...inputProps}
        {...register}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorId}
        className={cn(
          "border-border bg-secondary-bg/35 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-12 w-full min-w-0 rounded-xl border px-3 text-[14px] transition-colors duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-13 sm:px-4 ",
          errorMessage && "border-destructive focus:border-destructive",
          className,
        )}
      />
    </div>
  );
};
