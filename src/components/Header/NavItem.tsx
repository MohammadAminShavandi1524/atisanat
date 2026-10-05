"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  href: string;
};

const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname();
  const locale = useLocale();

  const isEnglish = locale === "en";

  const isActive =
    pathname === href ||
    (href.split("/").length > 2 && pathname.startsWith(`${href}/`));

  return (
    <li className="shrink-0">
      <Link
        href={href}
        className={cn(
          "block pt-2.75 font-medium transition-colors duration-300",
          isEnglish
            ? "3xl:text-[16px] text-[13px] xl:text-[14px] 2xl:text-[15px]"
            : "3xl:text-[18px] text-[14px] xl:text-[15px] 2xl:text-[17px]",
          "text-foreground/75 hover:text-custom-primary",
          isActive && "text-custom-primary",
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
