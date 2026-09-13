"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Logo = () => {
  const locale = useLocale();
  const t = useTranslations("Header");

  return (
    <Link
      href={`/${locale}`}
      className="flex shrink-0 items-center gap-x-2.5"
      aria-label={t("logoName")}
    >
      <div className="relative aspect-[1520/403] w-[150px] shrink-0">
        <Image
          src="/logo.png"
          alt={t("logoName")}
          fill
          priority
          sizes="150px"
          className="object-contain"
        />
      </div>

      <span className="text-foreground text-[24px] leading-none font-semibold pt-2.5">
        {t("logoName")}
      </span>
    </Link>
  );
};

export default Logo;
