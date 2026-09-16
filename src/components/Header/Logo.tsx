"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const Logo = () => {
  const locale = useLocale();
  const t = useTranslations("Header");

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/${locale}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-grid h-[44px] shrink-0 overflow-hidden"
      aria-label={t("logoName")}
    >
      {/* Keeps the component width equal to the logo name width */}
      <span className="invisible col-start-1 row-start-1 pt-2.5 text-[24px] leading-none font-semibold whitespace-nowrap">
        {t("logoName")}
      </span>

      {/* Logo Name */}
      <motion.span
        initial={false}
        animate={{
          y: isHovered ? -42 : 0,
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 1 : 1,
          filter: isHovered ? "blur(4px)" : "blur(0px)",
        }}
        transition={{
          y: {
            duration: 0.65,
            ease,
          },
          opacity: {
            duration: isHovered ? 0.3 : 0.45,
            ease,
          },
          scale: {
            duration: 0.6,
            ease,
          },
          filter: {
            duration: 0.4,
            ease,
          },
        }}
        className="text-foreground col-start-1 row-start-1 pt-3.5 text-[24px] leading-none font-semibold whitespace-nowrap"
      >
        {t("logoName")}
      </motion.span>

      {/* Image Logo */}
      <motion.div
        initial={false}
        animate={{
          y: isHovered ? 0 : 38,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.94,
          filter: isHovered ? "blur(0px)" : "blur(5px)",
        }}
        transition={{
          y: {
            duration: 0.72,
            ease,
          },
          opacity: {
            duration: isHovered ? 0.42 : 0.28,
            delay: isHovered ? 0.08 : 0,
            ease,
          },
          scale: {
            duration: 0.72,
            ease,
          },
          filter: {
            duration: 0.5,
            ease,
          },
        }}
        className="col-start-1 row-start-1 flex items-center"
      >
        <motion.div
          initial={false}
          animate={{
            y: isHovered ? 0 : 4,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="relative aspect-[1520/403] w-[150px] shrink-0"
        >
          <Image
            src="/logo.png"
            alt={t("logoName")}
            fill
            priority
            sizes="150px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default Logo;
