"use client";

import {
  Controller,
  type Control,
  type Path,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import type { CVResumeFormValues } from "../cv-resume.types";

interface FormBooleanFieldProps {
  name: Path<CVResumeFormValues>;
  control: Control<CVResumeFormValues>;

  label: string;

  yesLabel: string;
  noLabel: string;

  className?: string;
}

const FormBooleanField = ({
  name,
  control,
  label,
  yesLabel,
  noLabel,
  className,
}: FormBooleanFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = Boolean(field.value);

        return (
          <div className={cn("min-w-0", className)}>
            <p className="text-foreground mb-2.5 text-[14px] font-medium">
              {label}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                aria-pressed={value}
                onClick={() => field.onChange(true)}
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-colors duration-300",
                  value
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
                    : "border-border bg-secondary-bg/35 text-muted-foreground hover:border-custom-primary/60",
                )}
              >
                {yesLabel}
              </button>

              <button
                type="button"
                aria-pressed={!value}
                onClick={() => field.onChange(false)}
                className={cn(
                  "flex h-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-colors duration-300",
                  !value
                    ? "border-custom-primary bg-custom-primary/8 text-custom-primary"
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