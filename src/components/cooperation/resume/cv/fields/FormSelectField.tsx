"use client";

import {
  Controller,
  type Control,
  type FieldError,
  type Path,
} from "react-hook-form";

import {
  CustomSelect,
  type CustomSelectOption,
} from "@/components/ui/custom-select";

import type { CVResumeFormValues } from "../cv-resume.types";

interface FormSelectFieldProps {
  name: Path<CVResumeFormValues>;
  control: Control<CVResumeFormValues>;

  label: string;
  placeholder: string;

  options: CustomSelectOption[];

  error?: FieldError;

  disabled?: boolean;
  className?: string;
}

const FormSelectField = ({
  name,
  control,
  label,
  placeholder,
  options,
  error,
  disabled,
  className,
}: FormSelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomSelect
          id={name}
          name={name}
          label={label}
          placeholder={placeholder}
          options={options}
          value={
            typeof field.value === "string"
              ? field.value
              : undefined
          }
          onChange={field.onChange}
          disabled={disabled}
          className={className}
          error={
            typeof error?.message === "string"
              ? error.message
              : undefined
          }
        />
      )}
    />
  );
};

export default FormSelectField;