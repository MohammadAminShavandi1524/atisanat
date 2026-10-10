"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "desktop" | "mobile" | "sidebar";
};

const ease = [0.16, 1, 0.3, 1] as const;

const Logo = ({ variant = "desktop" }: LogoProps) => {
  const locale = useLocale();
  const t = useTranslations("Header");

  const [isHovered, setIsHovered] = useState(false);

  if (variant === "sidebar") {
    return (
      <Link
        href={`/${locale}`}
        onClick={() => undefined}
        className="text-foreground s:text-[20px] text-[18px] leading-none font-semibold"
        aria-label={t("logoName")}
      >
        {t("logoName")}
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <Link
        href={`/${locale}`}
        dir={locale === "fa" ? "rtl" : "ltr"}
        className="flex min-w-0 items-center gap-3"
        aria-label={t("logoName")}
      >
        <div className="relative mb-1 aspect-[1520/403] w-[135px] shrink-0">
          <Image
            src="/logo.png"
            alt={t("logoName")}
            fill
            priority
            sizes="120px"
            className="object-contain"
          />
        </div>

        <span className="text-foreground hidden rtl:pt-1.5 ltr:pt-2 text-[22px] leading-none font-semibold whitespace-nowrap sm:inline sm:text-[23px]">
          {t("logoName")}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-grid h-[40px] shrink-0 overflow-hidden xl:h-[42px] 2xl:h-[44px]"
      aria-label={t("logoName")}
    >
      <span
        className={cn(
          "invisible col-start-1 row-start-1 pt-2 leading-none font-semibold whitespace-nowrap",
          locale === "en"
            ? "text-[20px] xl:text-[21px] 2xl:text-[23px]"
            : "text-[21px] xl:text-[23px] 2xl:text-[26px]",
        )}
      >
        {t("logoName")}
      </span>

      <motion.span
        initial={false}
        animate={{
          y: isHovered ? -42 : 0,
          opacity: isHovered ? 0 : 1,
          filter: isHovered ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6, ease }}
        className={cn(
          "text-foreground col-start-1 row-start-1 pt-2 leading-none font-semibold whitespace-nowrap",
          locale === "en"
            ? "text-[20px] xl:text-[21px] 2xl:text-[23px]"
            : "text-[21px] xl:text-[23px] 2xl:text-[26px]",
        )}
      >
        {t("logoName")}
      </motion.span>

      <motion.div
        initial={false}
        animate={{
          y: isHovered ? 0 : 38,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.94,
          filter: isHovered ? "blur(0px)" : "blur(5px)",
        }}
        transition={{ duration: 0.72, ease }}
        className="col-start-1 row-start-1 flex items-center"
      >
        <div className="relative aspect-[1520/403] w-[124px] shrink-0 xl:w-[138px] 2xl:w-[150px]">
          <Image
            src="/logo.png"
            alt={t("logoName")}
            fill
            priority
            sizes="150px"
            className="object-contain"
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;
