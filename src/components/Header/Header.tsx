"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

import Logo from "./Logo";


import { cn } from "@/lib/utils";
import Nav from "./Nav";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const locale = useLocale();

  const lastScrollY = useRef(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const SCROLL_THRESHOLD = 80;
    const SCROLL_DELTA = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(difference) < SCROLL_DELTA) return;

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
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out border-b-border border-b",
        showHeader ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="w90">
        <div className=" bg-background/95 flex h-[84px] pb-1.5 items-center">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Nav />
          </div>

          <div className="shrink-0">
            <LanguageSwitcher defaultLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
