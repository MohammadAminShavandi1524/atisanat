"use client";

import { useLocale, useTranslations } from "next-intl";
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

        <NavItem
          label={t("cooperation")}
          href={`/${locale}/cooperation`}
        />

        <NavItem
          label={t("standardTables")}
          href={`/${locale}/standard-tables`}
        />

        <NavItem label={t("contactUs")} href={`/${locale}/contact-us`} />

        <NavItem label={t("aboutUs")} href={`/${locale}/about-us`} />

        <NavItem label={t("faq")} href={`/${locale}/faq`} />
      </ul>
    </nav>
  );
};

export default Nav;