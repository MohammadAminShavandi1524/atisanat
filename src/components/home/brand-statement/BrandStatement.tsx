"use client";

import { useEffect, useRef } from "react";

import { useLocale, useTranslations } from "next-intl";

import { animateBrandStatement } from "./brandStatementAnimations";

const BrandStatement = () => {
  const locale = useLocale();
  const t = useTranslations("Home.BrandStatement");

  const rootRef = useRef<HTMLElement>(null);

  const isRTL = locale === "fa";

  const sloganWords = t("slogan")
    .split(isRTL ? "،" : ",")
    .map((word) => word.trim());

  const sloganOffsets = isRTL
    ? ["ms-0 3xl:ms-0", "ms-8 3xl:ms-[72px]", "ms-16 3xl:ms-[144px]"]
    : ["ms-0 3xl:ms-0", "ms-10 3xl:ms-[150px]", "ms-16 3xl:ms-[210px]"];

  useEffect(() => {
    if (!rootRef.current) return;

    return animateBrandStatement(rootRef.current, isRTL);
  }, [isRTL]);

  return (
    <section
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background overflow-hidden"
    >
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-20">
        <div className="border-border relative overflow-hidden rounded-2xl border">
          <div className="bg-custom-primary/6 pointer-events-none absolute -start-32 -top-32 size-[420px] rounded-full blur-[120px]" />

          <div className="3xl:px-12 3xl:py-14 relative grid grid-cols-1 items-center gap-10 px-6 py-8 sm:gap-12 sm:px-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10 lg:py-12 2xl:gap-16">
            {/* Slogan */}
            <div className="brand-slogan relative">
              <div className="flex flex-col">
                {sloganWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className={`brand-slogan-word text-foreground hover:text-custom-primary 3xl:text-[64px] w-fit cursor-default text-[40px] leading-[1.15] font-semibold transition-colors duration-300 sm:text-[48px] lg:text-[54px] 2xl:text-[60px] ${sloganOffsets[index] ?? "ms-0"}`}
                  >
                    {word}

                    {index !== sloganWords.length - 1 && (
                      <span className="text-custom-primary">
                        {isRTL ? "،" : ","}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="brand-content border-border border-t pt-8 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0 2xl:ps-12">
              <h2 className="text-foreground 3xl:text-[32px] max-w-2xl text-[25px] leading-[1.45] font-semibold sm:text-[28px] lg:text-[30px]">
                {t("title")}
              </h2>

              <p className="text-muted-foreground 3xl:mt-7 3xl:text-[16px] mt-5 max-w-2xl text-justify text-sm leading-7 sm:mt-6 sm:text-[15px] sm:leading-8">
                {t("description")}
              </p>

              <div className="brand-line bg-custom-primary origin-start mt-7 h-1 w-20 rounded-full sm:mt-8 sm:w-24" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
