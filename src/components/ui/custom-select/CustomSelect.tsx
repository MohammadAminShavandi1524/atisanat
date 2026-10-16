"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ChevronDown,
} from "lucide-react";

import {
  useLocale,
} from "next-intl";

import {
  cn,
} from "@/lib/utils";

import {
  ScrollArea,
} from "../scroll-area";

import CustomSelectItem from "./CustomSelectItem";

import type {
  CustomSelectProps,
} from "./types";

const CustomSelect = <
  T extends string,
>({
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
  const locale =
    useLocale();

  const [
    open,
    setOpen,
  ] = useState(false);

  const ref =
    useRef<HTMLDivElement>(
      null,
    );

  const selectedOption =
    useMemo(
      () =>
        options.find(
          (item) =>
            item.value === value,
        ),
      [
        options,
        value,
      ],
    );

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        !ref.current?.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
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

    setOpen(
      (previous) =>
        !previous,
    );
  };

  const errorId =
    error && id
      ? `${id}-error`
      : undefined;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-w-0 flex-col gap-2.5",
        open && "z-[100]",
        className,
      )}
    >
      {(label?.trim() ||
        error) && (
        <div className="flex min-h-5 items-center justify-between gap-3 px-2">
          {label?.trim() && (
            <label
              htmlFor={id}
              className="text-foreground min-w-0 truncate text-[14px] font-medium"
            >
              {label}
            </label>
          )}

          {error && (
            <p
              id={errorId}
              role="alert"
              title={error}
              className="text-destructive max-w-[55%] shrink-0 truncate text-end text-xs"
            >
              {error}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        <button
          id={id}
          name={name}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={
            Boolean(error)
          }
          aria-describedby={
            errorId
          }
          onClick={handleToggle}
          className={cn(
            "bg-secondary-bg/35 text-foreground relative flex h-12 w-full min-w-0 cursor-pointer items-center justify-between rounded-xl border px-3 text-[14px] outline-none sm:h-13 sm:px-4",
            "transition-[border-color,background-color,opacity] duration-300",
            open &&
              !error &&
              "border-custom-primary",
            error
              ? "border-destructive"
              : "border-border hover:border-custom-primary/60",
            disabled &&
              "cursor-not-allowed opacity-50",
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-start",
              selectedOption
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {selectedOption?.label ??
              placeholder}
          </span>

          <motion.span
            animate={{
              rotate:
                open
                  ? 180
                  : 0,
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
                open
                  ? "text-custom-primary"
                  : "text-muted-foreground",
              )}
              strokeWidth={1.7}
            />
          </motion.span>
        </button>

        <AnimatePresence>
          {open &&
            !disabled && (
              <motion.div
                role="listbox"
                initial={{
                  opacity: 0,
                  y: -5,
                  scale: 0.99,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                  scale: 0.99,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="bg-secondary-bg border-border absolute start-0 top-full z-[9999] mt-2 w-full min-w-0 overflow-hidden rounded-xl border shadow-xl"
              >
                <ScrollArea
                  dir={
                    locale === "en"
                      ? "ltr"
                      : "rtl"
                  }
                  lockWheel
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  className={cn(
                    "w-full",
                    options.length > 5
                      ? "h-64"
                      : "h-auto",
                  )}
                  viewportClassName="overscroll-contain"
                  scrollBarClassName="z-20"
                >
                  <div className="flex flex-col py-2">
                    {options.map(
                      (option) => (
                        <CustomSelectItem
                          key={
                            option.value
                          }
                          option={
                            option
                          }
                          selected={
                            option.value ===
                            value
                          }
                          onSelect={(
                            selectedValue,
                          ) => {
                            onChange(
                              selectedValue as T,
                            );

                            setOpen(
                              false,
                            );
                          }}
                        />
                      ),
                    )}
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