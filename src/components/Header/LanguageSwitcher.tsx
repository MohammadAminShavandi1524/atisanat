"use client";

import { useTransition } from "react";

import { useParams } from "next/navigation";
import { Earth } from "lucide-react";
import { Locale, useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  defaultLocale: Locale;
  variant?: "desktop" | "mobile";
};

const LanguageSwitcher = ({
  defaultLocale,
  variant = "desktop",
}: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();
  const nextLocale = defaultLocale === "fa" ? "en" : "fa";

  const handleToggle = () => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error next-intl typed routes
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        aria-label={`Switch language to ${nextLocale}`}
        className={cn(
          "border-border bg-background text-foreground flex min-w-11 min-h-11 cursor-pointer items-center justify-center rounded-lg border",
          "transition-colors duration-300",
          "hover:border-custom-primary hover:text-custom-primary",
          "active:scale-[0.97]",
          isPending && "pointer-events-none opacity-50",
        )}
      >
        <Earth size={22} strokeWidth={1.7} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={`Switch language to ${nextLocale}`}
      className={cn(
        "group border-border bg-background relative mt-2 flex h-10 cursor-pointer items-center gap-x-2 overflow-hidden rounded-lg border px-2.5 pe-3",
        "shadow-[0_2px_8px_rgba(32,43,58,0.05)]",
        "transition-all duration-300 xl:mt-3 xl:h-11 xl:px-3 2xl:h-12 2xl:gap-x-2.5 2xl:pe-4",
        "hover:border-custom-primary/50 hover:bg-secondary-bg",
        "active:scale-[0.97] rtl:ms-3 2xl:rtl:ms-6",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      <span className="border-border bg-secondary-bg flex size-7 items-center justify-center rounded-md border xl:size-8">
        <Earth
          className="text-foreground/70 group-hover:text-custom-primary size-4 xl:size-5"
          strokeWidth={1.7}
        />
      </span>

      <span className="text-foreground text-[13px] font-semibold uppercase xl:text-[14px] 2xl:text-[16px]">
        {locale === "fa" ? "EN" : "FA"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
