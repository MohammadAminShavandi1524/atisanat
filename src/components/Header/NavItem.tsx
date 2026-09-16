"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  href: string;
};

const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (href.split("/").length > 2 && pathname.startsWith(`${href}/`));

  return (
    <li className="shrink-0">
      <Link
        href={href}
        className={cn(
          "block pt-2.75 text-[17px] font-medium transition-colors duration-300",
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
