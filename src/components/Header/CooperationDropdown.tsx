"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const CooperationDropdown = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Header.Navigation");

  const href = `/${locale}/cooperation`;

  const isActive =
    pathname === href ||
    (href.split("/").length > 2 && pathname.startsWith(`${href}/`));

  const items = [
    {
      label: t("submitResume"),
      href: `/${locale}/cooperation/resume`,
    },
    {
      label: t("businessCooperation"),
      href: `/${locale}/cooperation/business`,
    },
  ];

  return (
    <li className="group relative shrink-0">
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-1 pt-2.75 text-[17px] font-medium transition-colors duration-300",
          "text-foreground/75 hover:text-custom-primary",
          isActive && "text-custom-primary",
        )}
      >
        <span>{t("cooperation")}</span>

        <ChevronDown
          size={20}
          strokeWidth={1.8}
          className="mt-[2px] transition-transform duration-300 group-hover:rotate-180"
        />
      </Link>

      <div className="pointer-events-none absolute start-0 top-full z-50 pt-4 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="border-border bg-background w-[220px] overflow-hidden rounded-lg border p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group/item hover:bg-custom-primary/[0.05] block rounded-md px-4 py-3.5 transition-colors duration-300"
            >
              <span className="text-foreground group-hover/item:text-custom-primary text-[15px] font-medium transition-colors duration-300">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};

export default CooperationDropdown;
