"use client";

import { Menu } from "lucide-react";
import { useLocale } from "next-intl";

import { useMobileSidebar } from "@/components/ui/mobile-sidebar";

import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const MobileHeader = () => {
  const locale = useLocale();
  const { open, openSidebar } = useMobileSidebar();

  return (
    <div className="w90 py-2.5">
      <div className="grid min-h-[52px] grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-x-2">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="border-border text-foreground hover:border-custom-primary hover:text-custom-primary flex size-11 cursor-pointer items-center justify-center rounded-md border transition-colors duration-300"
        >
          <Menu className="size-[22px]" strokeWidth={1.7} />
        </button>

        <div className="flex min-w-0 justify-center">
          <Logo variant="mobile" />
        </div>

        <div className="flex justify-end">
          <LanguageSwitcher defaultLocale={locale} variant="mobile" />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
