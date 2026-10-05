"use client";

import Link from "next/link";

import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
  MobileSidebarBody,
  MobileSidebarHeader,
  useMobileSidebar,
} from "@/components/ui/mobile-sidebar";

import { cn } from "@/lib/utils";
import Logo from "./Logo";

const MobileMenu = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header.Navigation");

  const { closeSidebar } = useMobileSidebar();

  const navigationItems = [
    {
      label: t("home"),
      href: `/${locale}`,
    },
    {
      label: t("products"),
      href: `/${locale}/products`,
    },
    {
      label: t("machineDimensions"),
      href: `/${locale}/machine-dimensions`,
    },
    {
      label: t("standardTables"),
      href: `/${locale}/standard-tables`,
    },
    {
      label: t("machiningChallenges"),
      href: `/${locale}/machining-challenges`,
    },
    {
      label: t("contactUs"),
      href: `/${locale}/contact-us`,
    },
    {
      label: t("aboutUs"),
      href: `/${locale}/about-us`,
    },
  ];

  const cooperationItems = [
    {
      label: t("submitResume"),
      href: `/${locale}/cooperation/resume`,
    },
    {
      label: t("businessCooperation"),
      href: `/${locale}/cooperation/business`,
    },
  ];

  const isActive = (href: string) =>
    pathname === href ||
    (href !== `/${locale}` && pathname.startsWith(`${href}/`));

  return (
    <div
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="flex min-h-full flex-col"
    >
      <MobileSidebarHeader className="justify-between px-5">
        <Logo variant="sidebar" />

        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close navigation menu"
          className="border-border text-foreground hover:border-custom-primary hover:text-custom-primary flex size-10 cursor-pointer items-center justify-center border transition-colors duration-300 rounded-md"
        >
          <X className="size-5.5" strokeWidth={1.7} />
        </button>
      </MobileSidebarHeader>

      <MobileSidebarBody>
        <nav>
          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "text-foreground/80 hover:bg-secondary-bg hover:text-custom-primary block px-3 py-3.5 text-[15px] font-medium transition-colors duration-300 rounded-lg",
                    isActive(item.href) &&
                      "bg-secondary-bg text-custom-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-border mt-5 border-t pt-5">
            <p className="text-muted-foreground px-4 pb-3 text-sm font-medium">
              {t("cooperation")}
            </p>

            <ul className="flex flex-col gap-1">
              {cooperationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      "text-foreground/80 hover:bg-secondary-bg hover:text-custom-primary block px-3 py-3.5 text-[15px] transition-colors duration-300 font-medium rounded-lg",
                      isActive(item.href) &&
                        "bg-secondary-bg text-custom-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </MobileSidebarBody>
    </div>
  );
};

export default MobileMenu;
