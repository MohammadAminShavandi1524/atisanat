"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale, useTranslations } from "next-intl";

import { animateCoreValues } from "./coreValuesAnimations";

const values = [
  "precision",
  "infrastructure",
  "strategicIndustries",
  "noShortcuts",
] as const;

const CoreValues = () => {
  const t = useTranslations("Home.CoreValues");
  const locale = useLocale();

  const rootRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const [titleMinHeight, setTitleMinHeight] = useState<number>();

  useEffect(() => {
    if (!rootRef.current) return;

    return animateCoreValues(rootRef.current);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const measureTitles = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const heights = titleRefs.current
          .filter((title): title is HTMLHeadingElement => Boolean(title))
          .map((title) => title.getBoundingClientRect().height);

        if (heights.length > 0) {
          setTitleMinHeight(Math.max(...heights));
        }
      });
    };

    const resizeObserver = new ResizeObserver(measureTitles);

    titleRefs.current.forEach((title) => {
      if (title) {
        resizeObserver.observe(title);
      }
    });

    measureTitles();

    window.addEventListener("resize", measureTitles);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureTitles);
    };
  }, [locale]);

  return (
    <section ref={rootRef} className="bg-background overflow-hidden">
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-24">
        <h2 className="core-values-title text-foreground mb-7 text-[30px] leading-[1.2] font-semibold sm:mb-9 sm:text-[36px] lg:mb-10 lg:text-[40px]">
          {t("title")}
        </h2>

        <div className="core-values-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {values.map((value, index) => (
            <article
              key={value}
              className="core-value-card border-border group relative min-h-[200px] overflow-hidden rounded-2xl border p-5 sm:min-h-[220px] sm:p-6 lg:min-h-[235px] lg:p-8"
            >
              <div className="bg-custom-primary/0 group-hover:bg-custom-primary/5 absolute inset-0 transition-colors duration-500 ease-out" />

              <div className="relative z-10">
                <h3
                  ref={(element) => {
                    titleRefs.current[index] = element;
                  }}
                  style={{
                    minHeight: titleMinHeight
                      ? `${titleMinHeight}px`
                      : undefined,
                  }}
                  className="text-foreground group-hover:text-custom-primary text-[20px] leading-[1.4] font-semibold transition-all duration-500 ease-out sm:text-[21px] lg:text-[23px]"
                >
                  {t(`${value}.title`)}
                </h3>

                <p className="text-muted-foreground mt-4 text-justify text-sm leading-7 transition-all duration-500 ease-out sm:mt-5 sm:text-[15px]">
                  {t(`${value}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
