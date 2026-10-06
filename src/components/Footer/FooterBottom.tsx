"use client";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";

const FooterBottom = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");

  const isRTL = locale === "fa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="border-border border-t">
      {/* Mobile */}
      <div className="w90 flex flex-col items-center gap-2 py-4 text-center lg:hidden">
        <p className="text-muted-foreground text-xs leading-6">
          {t("bottom.copyright")}
        </p>

        <p className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-1.5 text-xs leading-6">
          <span>{t("bottom.designedBy")}</span>

          <Link
            href="https://atihooshbonyan.com"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="text-foreground hover:text-custom-primary transition-colors duration-300"
          >
            {t("bottom.developer")}
          </Link>
        </p>
      </div>

      {/* Desktop */}
      <div className="w90 hidden items-center justify-between py-4 lg:flex">
        <p className="text-muted-foreground text-sm leading-6">
          {t("bottom.copyright")}
        </p>

        <p className="text-muted-foreground flex items-center gap-x-1.5 text-sm leading-6">
          <span>{t("bottom.designedBy")}</span>

          <Link
            href="https://atihooshbonyan.com"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="text-foreground hover:text-custom-primary transition-colors duration-300"
          >
            {t("bottom.developer")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
