"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { ScrollArea } from "../scroll-area";
import CustomSelectItem from "./CustomSelectItem";
import { CustomSelectProps } from "./types";

const CustomSelect = <T extends string>({
  id,
  name,
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  error,
  disabled = false,
  className,
}: CustomSelectProps<T>) => {
  const locale = useLocale();

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((item) => item.value === value),
    [options, value],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setOpen((prev) => !prev);
  };

  return (
    <div className={cn("relative flex flex-col gap-2.5", className)}>
      {(label?.trim() || error) && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {label?.trim() && (
            <label
              htmlFor={id}
              className="text-foreground text-[14px] font-medium"
            >
              {label}
            </label>
          )}

          {error && (
            <p
              id={id ? `${id}-error` : undefined}
              role="alert"
              className="text-destructive text-xs"
            >
              {error}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative">
        <button
          id={id}
          name={name}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error && id ? `${id}-error` : undefined}
          onClick={handleToggle}
          className={cn(
            "bg-secondary-bg/35 text-foreground relative flex h-12 w-full min-w-0 cursor-pointer items-center justify-between rounded-xl border px-3 text-[14px] outline-none sm:h-13 sm:px-4",
            "transition-[border-color,background-color,opacity] duration-300",
            open && !error && "border-custom-primary",
            error
              ? "border-destructive focus:border-destructive"
              : "border-border hover:border-custom-primary/60",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "bg-custom-primary absolute inset-y-2 start-0 w-[2px] rounded-full transition-transform duration-300",
              open ? "scale-y-100" : "scale-y-0",
            )}
          />

          <span
            className={cn(
              "min-w-0 flex-1 truncate text-start",
              selectedOption ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <motion.span
            animate={{
              rotate: open ? 180 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="ms-4 flex shrink-0 items-center justify-center"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-colors duration-300",
                open ? "text-custom-primary" : "text-muted-foreground",
              )}
              strokeWidth={1.7}
            />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && !disabled && (
            <motion.div
              role="listbox"
              initial={{
                opacity: 0,
                y: -6,
                scaleY: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scaleY: 1,
              }}
              exit={{
                opacity: 0,
                y: -6,
                scaleY: 0.98,
              }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "top",
              }}
              className="bg-secondary-bg border-border absolute z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-xl"
            >
              <span
                aria-hidden="true"
                className="bg-custom-primary absolute inset-x-0 top-0 h-px"
              />

              <ScrollArea
                dir={locale === "en" ? "ltr" : "rtl"}
                className={cn("h-auto", options.length > 5 && "h-64")}
              >
                <div className="flex flex-col py-2">
                  {options.map((option) => (
                    <CustomSelectItem
                      key={option.value}
                      option={option}
                      selected={option.value === value}
                      onSelect={(selectedValue) => {
                        onChange(selectedValue as T);
                        setOpen(false);
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomSelect;
