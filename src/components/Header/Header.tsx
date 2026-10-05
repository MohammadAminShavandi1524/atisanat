"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import Logo from "./Logo";
import Nav from "./Nav";
import LanguageSwitcher from "./LanguageSwitcher";


import { cn } from "@/lib/utils";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("Header");

  const lastScrollY = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(difference) < 10) return;

      setShowHeader(difference < 0);
      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "border-b-border bg-background/95 fixed inset-x-0 top-0 z-50 border-b transition-transform duration-500 ease-out",
        showHeader ? "translate-y-0" : "-translate-y-full",
      )}
    >
      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="w90">
          <div className="flex h-[76px] items-center pb-1.5 xl:h-[80px] 2xl:h-[84px]">
            <div className="shrink-0">
              <Logo />
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-center">
              <Nav />
            </div>

            <div
              dir={locale === "fa" ? "rtl" : "ltr"}
              className="flex shrink-0 items-center gap-3 xl:gap-4 2xl:gap-5"
            >
              <LanguageSwitcher defaultLocale={locale} />

              <div className="relative hidden aspect-[1520/403] w-[124px] shrink-0 xl:w-[138px] 2xl:w-[150px]">
                <Image
                  src="/logo.png"
                  alt={t("logoName")}
                  fill
                  priority
                  sizes="(max-width: 1280px) 124px, (max-width: 1536px) 138px, 150px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
