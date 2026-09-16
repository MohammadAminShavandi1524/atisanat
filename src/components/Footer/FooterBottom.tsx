"use client";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";

const FooterBottom = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");

  const isRTL = locale === "fa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="border-border border-t">
      <div className="w90 flex items-center justify-between py-4">
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
