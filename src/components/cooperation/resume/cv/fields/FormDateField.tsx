"use client";

import { useMemo } from "react";

import { CalendarDays } from "lucide-react";
import { useLocale } from "next-intl";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import DatePicker, { DateObject } from "react-multi-date-picker";

import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

import gregorianEn from "react-date-object/locales/gregorian_en";
import persianFa from "react-date-object/locales/persian_fa";

import { cn } from "@/lib/utils";

interface FormDateFieldProps {
  id: string;

  label: string;

  register: UseFormRegisterReturn;

  error?: FieldError;

  disabled?: boolean;

  value?: string;

  onChange?: (value: string) => void;
}

const FormDateField = ({
  id,
  label,
  register,
  error,
  disabled = false,
  value = "",
  onChange,
}: FormDateFieldProps) => {
  const locale = useLocale();

  const isFa = locale === "fa";

  const errorMessage =
    typeof error?.message === "string" ? error.message : undefined;

  const errorId = errorMessage ? `${id}-error` : undefined;

  const pickerValue = useMemo(() => {
    if (!value) {
      return undefined;
    }

    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
      return undefined;
    }

    return new DateObject({
      calendar: gregorian,
      date: new Date(year, month - 1, day),
    });
  }, [value]);

  const handleChange = (date: DateObject | null) => {
    if (!date) {
      onChange?.("");
      return;
    }

    const gregorianDate = new DateObject(date).convert(gregorian);

    const formatted = gregorianDate.format("YYYY-MM-DD");

    onChange?.(formatted);
  };

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex min-h-5 items-center justify-between gap-3">
        <label
          htmlFor={id}
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

      <div
        className={cn("relative", disabled && "pointer-events-none opacity-50")}
      >
        <DatePicker
          value={pickerValue}
          onChange={handleChange}
          calendar={isFa ? persian : gregorian}
          locale={isFa ? persianFa : gregorianEn}
          format="YYYY/MM/DD"
          calendarPosition={isFa ? "bottom-right" : "bottom-left"}
          disabled={disabled}
          editable={false}
          inputMode="none"
          portal
          inputClass={cn(
            "border-border bg-secondary-bg/35 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-12 w-full min-w-0 rounded-xl border px-3 pe-11 text-[14px] outline-none transition-colors duration-300 sm:h-13 sm:px-4 sm:pe-11",
            errorMessage && "border-destructive focus:border-destructive",
          )}
          containerClassName="resume-date-picker-container !block !w-full"
          className="custom-resume-date-picker cursor-pointer"
        />

        <CalendarDays
          aria-hidden="true"
          size={18}
          strokeWidth={1.7}
          className="text-muted-foreground pointer-events-none absolute end-4 top-1/2 -translate-y-1/2"
        />

        <input type="hidden" {...register} value={value} readOnly />
      </div>
    </div>
  );
};

export default FormDateField;
