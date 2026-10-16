"use client";

import {
  Controller,
  type Control,
  type FieldError,
  type Path,
} from "react-hook-form";

import {
  cn,
} from "@/lib/utils";

import type {
  CVResumeFormValues,
} from "../cv-resume.types";

interface FormBooleanFieldProps {
  name:
    Path<CVResumeFormValues>;

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
      render={({
        field,
      }) => {
        const isYes =
          field.value ===
          true;

        const isNo =
          field.value ===
          false;

        return (
          <div
            className={cn(
              "min-w-0",
              className,
            )}
          >
            <div className="mb-2.5 flex min-h-5 items-center justify-between gap-3 px-2">
              <p className="text-foreground min-w-0 truncate text-[14px] font-medium">
                {label}
              </p>

              {errorMessage && (
                <p
                  role="alert"
                  title={
                    errorMessage
                  }
                  className="text-destructive max-w-[55%] shrink-0 truncate text-end text-xs"
                >
                  {
                    errorMessage
                  }
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
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
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-colors duration-300",
                  isYes
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
                    : errorMessage
                      ? "border-destructive bg-secondary-bg/35 text-muted-foreground"
                      : "border-border bg-secondary-bg/35 text-muted-foreground hover:border-custom-primary/60",
                )}
              >
                {
                  yesLabel
                }
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
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-colors duration-300",
                  isNo
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
                    : errorMessage
                      ? "border-destructive bg-secondary-bg/35 text-muted-foreground"
                      : "border-border bg-secondary-bg/35 text-muted-foreground hover:border-custom-primary/60",
                )}
              >
                {
                  noLabel
                }
              </button>
            </div>
          </div>
        );
      }}
    />
  );
};

export default FormBooleanField;