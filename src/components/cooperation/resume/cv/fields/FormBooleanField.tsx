"use client";

import {
  Controller,
  type Control,
  type FieldError,
  type Path,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import type { CVResumeFormValues } from "../cv-resume.types";

interface FormBooleanFieldProps {
  name: Path<CVResumeFormValues>;

  control:
    Control<CVResumeFormValues>;

  label: string;

  yesLabel: string;
  noLabel: string;

  error?: FieldError;

  className?: string;
}

const FormBooleanField = ({
  name,
  control,
  label,
  yesLabel,
  noLabel,
  error,
  className,
}: FormBooleanFieldProps) => {
  const errorMessage =
    typeof error?.message ===
    "string"
      ? error.message
      : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isYes =
          field.value === true;

        const isNo =
          field.value === false;

        return (
          <div
            className={cn(
              "min-w-0",
              className,
            )}
          >
            <div className="mb-2.5 flex min-h-5 items-start justify-between gap-2 px-1 s:items-center s:gap-3 s:px-2">
              <p className="text-foreground min-w-0 text-[13px] leading-5 font-medium whitespace-normal s:truncate s:text-[14px] s:leading-normal">
                {label}
              </p>

              {errorMessage && (
                <p
                  role="alert"
                  title={
                    errorMessage
                  }
                  className="text-destructive max-w-[48%] shrink-0 text-end text-[11px] leading-4 s:max-w-[55%] s:truncate s:text-xs s:leading-normal"
                >
                  {
                    errorMessage
                  }
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 s:gap-2.5">
              <button
                type="button"
                aria-pressed={
                  isYes
                }
                onClick={() =>
                  field.onChange(
                    true,
                  )
                }
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors duration-300 s:px-4",
                  isYes
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
                    : errorMessage
                      ? "border-destructive bg-secondary-bg/35 text-muted-foreground"
                      : "border-border bg-secondary-bg/35 text-muted-foreground hover:border-custom-primary/60",
                )}
              >
                {yesLabel}
              </button>

              <button
                type="button"
                aria-pressed={
                  isNo
                }
                onClick={() =>
                  field.onChange(
                    false,
                  )
                }
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors duration-300 s:px-4",
                  isNo
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
                    : errorMessage
                      ? "border-destructive bg-secondary-bg/35 text-muted-foreground"
                      : "border-border bg-secondary-bg/35 text-muted-foreground hover:border-custom-primary/60",
                )}
              >
                {noLabel}
              </button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default FormBooleanField;
