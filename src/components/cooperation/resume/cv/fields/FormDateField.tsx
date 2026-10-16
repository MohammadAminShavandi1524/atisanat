"use client";

import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface FormDateFieldProps {
  id: string;
  label: string;

  register: UseFormRegisterReturn;

  error?: FieldError;

  disabled?: boolean;
}

const FormDateField = ({
  id,
  label,
  register,
  error,
  disabled,
}: FormDateFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label
          htmlFor={id}
          className="text-foreground text-[14px] font-medium"
        >
          {label}
        </label>

        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-destructive text-xs"
          >
            {error.message}
          </span>
        )}
      </div>

      <input
        id={id}
        type="date"
        dir="ltr"
        disabled={disabled}
        {...register}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="border-border bg-secondary-bg/35 text-foreground focus:border-custom-primary h-12 w-full min-w-0 rounded-xl border px-3 text-[14px] outline-none transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:h-13 sm:px-4"
      />
    </div>
  );
};

export default FormDateField;