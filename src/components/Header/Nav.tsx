"use client";

import { useLocale, useTranslations } from "next-intl";

import CooperationDropdown from "./CooperationDropdown";
import NavItem from "./NavItem";

import { cn } from "@/lib/utils";

const Nav = () => {
  const locale = useLocale();
  const t = useTranslations("Header.Navigation");

  const isEnglish = locale === "en";

  return (
    <nav>
      <ul
        className={cn(
          "flex items-center whitespace-nowrap",
          isEnglish
            ? "3xl:gap-x-6 gap-x-2 xl:gap-x-3 2xl:gap-x-4"
            : "3xl:ltr:gap-x-7 3xl:rtl:gap-x-7 ltr:gap-x-3 xl:ltr:gap-x-4 2xl:ltr:gap-x-6 rtl:gap-x-3 xl:rtl:gap-x-4 2xl:rtl:gap-x-6",
        )}
      >
        <NavItem label={t("home")} href={`/${locale}`} />

        <NavItem label={t("products")} href={`/${locale}/products`} />

        <NavItem
          label={t("machineDimensions")}
          href={`/${locale}/machine-dimensions`}
        />

        <CooperationDropdown />

        <NavItem
          label={t("standardTables")}
          href={`/${locale}/standard-tables`}
        />

        <NavItem
          label={t("machiningChallenges")}
          href={`/${locale}/machining-challenges`}
        />

        <NavItem label={t("contactUs")} href={`/${locale}/contact-us`} />

        <NavItem label={t("aboutUs")} href={`/${locale}/about-us`} />
      </ul>
    </nav>
  );
};

export default Nav;
