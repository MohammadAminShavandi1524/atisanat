"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";

type MachineRow = {
  process: string;
  dimensions: string;
  country: string;
};

export default function MachineDimensionsContent() {
  const t = useTranslations("MachineDimensions");
  const locale = useLocale();
  const isPersian = locale.startsWith("fa");
  const pageRef = useRef<HTMLDivElement | null>(null);

  const rows = t.raw("table.rows") as MachineRow[];
  const numberFormatter = new Intl.NumberFormat(locale);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      // فقط ردیف‌های قابل‌مشاهده در breakpoint فعلی انیمیت می‌شوند.
      const visibleRows = Array.from(
        page.querySelectorAll<HTMLElement>("[data-gsap-row]"),
      ).filter((row) => row.getClientRects().length > 0);

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from("[data-gsap-title]", {
          autoAlpha: 0,
          duration: 0.65,
        })
        .from(
          "[data-gsap-description]",
          {
            autoAlpha: 0,
            duration: 0.5,
          },
          "-=0.35",
        )
        .from(
          "[data-gsap-table]",
          {
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.25",
        )
        .from(
          visibleRows,
          {
            autoAlpha: 0,
            duration: 0.38,
            stagger: 0.055,
            clearProps: "all",
          },
          "-=0.2",
        );
    }, page);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      dir={isPersian ? "rtl" : "ltr"}
      className="bg-background text-foreground min-h-screen"
    >
      <section className="w90 xs:py-10 3xl:py-20 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Page heading */}
          <header className="mb-8 text-center sm:mb-10 md:mb-12">
            <h1
              data-gsap-title
              className="text-foreground xss:text-4xl text-3xl leading-tight font-extrabold tracking-tight md:text-5xl 2xl:text-6xl"
            >
              {t("hero.title")}
            </h1>

            <p
              data-gsap-description
              className="text-muted-foreground xs:text-base mx-auto mt-5 max-w-2xl text-sm leading-8 sm:mt-6 sm:leading-9"
            >
              {t("hero.description")}
            </p>
          </header>

          {/* Dimensions */}
          <div
            data-gsap-table
            className="border-border bg-card w-full overflow-hidden rounded-xl border shadow-[0_12px_35px_rgba(32,43,58,0.06)] sm:rounded-2xl"
          >
            {/* Desktop table: mlg and above */}
            <div
              role="table"
              aria-label={t("hero.title")}
              aria-rowcount={rows.length + 1}
              className="mlg:block hidden w-full text-sm sm:text-base"
            >
              {/* Table header */}
              <div
                role="row"
                aria-rowindex={1}
                className="bg-custom-primary text-primary-foreground grid grid-cols-[12%_28%_37%_23%] font-bold"
              >
                <div
                  role="columnheader"
                  className="px-3 py-4 text-center sm:py-5 lg:px-4"
                >
                  {t("table.headers.row")}
                </div>

                <div
                  role="columnheader"
                  className={`min-w-0 px-3 py-4 sm:py-5 lg:px-4 ${
                    isPersian ? "text-right" : "text-left"
                  }`}
                >
                  {t("table.headers.process")}
                </div>

                <div
                  role="columnheader"
                  className="min-w-0 px-3 py-4 text-center sm:py-5 lg:px-4"
                >
                  {t("table.headers.dimensions")}
                </div>

                <div
                  role="columnheader"
                  className={`min-w-0 px-3 py-4 sm:py-5 lg:px-4 ${
                    isPersian ? "text-right" : "text-left"
                  }`}
                >
                  {t("table.headers.country")}
                </div>
              </div>

              {/* Table rows */}
              <div className="divide-border/70 divide-y">
                {rows.map((machine, index) => (
                  <div
                    key={`${machine.process}-${index}`}
                    role="row"
                    aria-rowindex={index + 2}
                    data-gsap-row
                    className={`grid grid-cols-[12%_28%_37%_23%] ${
                      index % 2 === 0 ? "bg-card" : "bg-secondary-bg"
                    }`}
                  >
                    <div
                      role="cell"
                      className="text-muted-foreground flex min-w-0 items-center justify-center px-3 py-4 sm:py-5 lg:px-4"
                    >
                      {numberFormatter.format(index + 1)}
                    </div>

                    <div
                      role="cell"
                      className={`text-card-foreground flex min-w-0 items-center px-3 py-4 leading-7 font-medium sm:py-5 lg:px-4 ${
                        isPersian ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="break-words">{machine.process}</span>
                    </div>

                    <div
                      role="cell"
                      className="flex min-w-0 items-center justify-center px-3 py-4 sm:py-5 lg:px-4"
                    >
                      <span
                        dir={
                          /[A-Za-z0-9]/.test(machine.dimensions)
                            ? "ltr"
                            : isPersian
                              ? "rtl"
                              : "ltr"
                        }
                        className="text-foreground text-center leading-7 font-semibold [unicode-bidi:isolate]"
                      >
                        {machine.dimensions}
                      </span>
                    </div>

                    <div
                      role="cell"
                      className={`text-foreground flex min-w-0 items-center px-3 py-4 leading-7 sm:py-5 lg:px-4 ${
                        isPersian ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="break-words">{machine.country}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile and tablet cards: below mlg */}
            <div className="mlg:hidden grid min-w-0 gap-3 p-3 sm:gap-4 sm:p-4">
              {rows.map((machine, index) => (
                <div
                  key={`${machine.process}-${index}`}
                  data-gsap-row
                  className="border-border bg-card min-w-0 rounded-xl border p-3.5 sm:p-4"
                >
                  {/* Process */}
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="border-border text-muted-foreground shrink-0 border-e pe-3 text-base font-semibold tabular-nums sm:text-lg">
                      {numberFormatter.format(index + 1)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-muted-foreground mb-1 text-xs">
                        {t("table.headers.process")}
                      </p>

                      <p className="text-foreground text-sm leading-6 font-semibold break-words sm:text-base">
                        {machine.process}
                      </p>
                    </div>
                  </div>

                  {/* Dimensions and country */}
                  <div className="border-border/70 mt-4 grid min-w-0 grid-cols-2 gap-3 border-t pt-3">
                    <div className="min-w-0">
                      <p className="text-muted-foreground mb-1.5 text-xs leading-5">
                        {t("table.headers.dimensions")}
                      </p>

                      <p
                        // dir={
                        //   /[A-Za-z0-9]/.test(machine.dimensions)
                        //     ? "ltr"
                        //     : isPersian
                        //       ? "rtl"
                        //       : "ltr"
                        // }
                        className="text-foreground text-sm leading-6 font-semibold break-words [unicode-bidi:isolate]"
                      >
                        {machine.dimensions}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-muted-foreground mb-1.5 text-xs leading-5">
                        {t("table.headers.country")}
                      </p>

                      <p className="text-foreground text-sm leading-6 font-medium break-words">
                        {machine.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
