"use client";

import { useLocale, useTranslations } from "next-intl";

import CooperationDropdown from "./CooperationDropdown";
import NavItem from "./NavItem";

const Nav = () => {
  const locale = useLocale();
  const t = useTranslations("Header.Navigation");

  return (
    <nav>
      <ul className="flex items-center gap-x-8 whitespace-nowrap">
        <NavItem label={t("home")} href={`/${locale}`} />

        <NavItem label={t("products")} href={`/${locale}/products`} />

        <NavItem
          label={t("machiningChallenges")}
          href={`/${locale}/machining-challenges`}
        />

        <CooperationDropdown />

        <NavItem
          label={t("standardTables")}
          href={`/${locale}/standard-tables`}
        />

        <NavItem label={t("contactUs")} href={`/${locale}/contact-us`} />

        <NavItem label={t("aboutUs")} href={`/${locale}/about-us`} />
      </ul>
    </nav>
  );
};

export default Nav;
