"use client";

import { useEffect, useRef } from "react";

import { Quote } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import { animateAboutPage } from "./aboutAnimations";

const AboutSection = () => {
  const t = useTranslations("About");
  const locale = useLocale();

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    return animateAboutPage(rootRef.current);
  }, [locale]);

  return (
    <main
      ref={rootRef}
      className="bg-background text-foreground overflow-hidden"
    >
      {/* Opening */}
      <section className="about-opening">
        <div className="w90 3xl:pt-24 mx-auto pt-10 sm:pt-14 xl:pt-16 2xl:pt-20">
          <div className="border-border relative overflow-hidden rounded-2xl border px-5 py-8 sm:px-8 sm:py-10 xl:px-12 xl:py-14 2xl:px-16 2xl:py-16">
            <div className="bg-custom-primary/8 pointer-events-none absolute -end-20 -top-20 size-72 rounded-full blur-[90px]" />

            <div className="relative flex flex-col items-start gap-5 sm:gap-6 lg:flex-row lg:gap-10">
              <div className="bg-custom-primary/10 flex size-14 shrink-0 items-center justify-center rounded-2xl sm:size-16">
                <Quote
                  className="text-custom-primary size-7 sm:size-8"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-justify text-base leading-8 font-medium sm:text-lg sm:leading-9 xl:text-xl xl:leading-10 2xl:text-[24px] 2xl:leading-[2]">
                  {t("opening.description")}
                </p>

                <div
                  className="bg-custom-primary mt-6 h-1 w-16 rounded-full sm:mt-8 sm:w-20"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="about-hero">
        <div className="w90 3xl:py-24 mx-auto py-14 sm:py-16 xl:py-16 2xl:py-20">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 xl:gap-12 2xl:gap-16">
            <div>
              <h1 className="3xl:text-[56px] text-[36px] leading-[1.18] font-semibold tracking-[-0.04em] sm:text-[42px] lg:text-[48px] xl:text-[42px] 2xl:text-[50px]">
                {t("hero.slogan")}
              </h1>

              <p className="text-muted-foreground mt-5 text-justify text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8 xl:mt-5 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("hero.description")}
              </p>
            </div>

            <div className="bg-secondary-bg 3xl:p-10 rounded-2xl p-6 sm:p-8 xl:p-6 2xl:p-8">
              <h2 className="3xl:text-[27px] text-xl leading-[1.5] font-semibold tracking-[-0.025em] sm:text-2xl xl:text-xl 2xl:text-[24px]">
                {t("hero.title")}
              </h2>

              <p className="text-muted-foreground mt-4 text-justify text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("hero.summary")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-introduction bg-secondary-bg">
        <div className="w90 3xl:py-24 mx-auto py-14 sm:py-16 xl:py-16 2xl:py-20">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_2.2fr] xl:gap-12 2xl:gap-16">
            <div>
              <h2 className="3xl:text-[38px] text-[30px] leading-[1.35] font-semibold tracking-[-0.03em] sm:text-[34px] xl:text-[28px] 2xl:text-[34px]">
                {t("introduction.title")}
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:gap-8 2xl:gap-10">
              <div className="about-introduction-card bg-background rounded-xl p-5 sm:p-7 xl:p-6 2xl:p-7">
                <p className="text-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph1")}
                </p>
              </div>

              <div className="about-introduction-card bg-background rounded-xl p-5 sm:p-7 xl:p-6 2xl:p-7">
                <p className="text-muted-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph2")}
                </p>
              </div>

              <div className="about-introduction-card bg-background rounded-xl p-5 sm:col-span-2 sm:p-7 xl:p-6 2xl:p-7">
                <p className="text-muted-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="about-ceo">
        <div className="w90 3xl:py-24 mx-auto py-14 sm:py-16 xl:py-16 2xl:py-20">
          <div className="mb-8 flex items-start gap-4 sm:mb-10 sm:items-center sm:gap-5 xl:mb-8">
            <div className="bg-secondary-bg flex size-11 shrink-0 items-center justify-center rounded-lg sm:size-12">
              <Quote className="text-custom-primary size-5" strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-custom-primary text-sm font-medium">
                {t("ceo.role")}
              </p>

              <h2 className="3xl:text-[38px] mt-1.5 text-[28px] leading-[1.3] font-semibold tracking-[-0.03em] sm:text-[34px] xl:text-[28px] 2xl:text-[34px]">
                {t("ceo.title")}
              </h2>
            </div>
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 xl:gap-5 2xl:gap-6">
            <div className="about-ceo-card bg-secondary-bg rounded-xl p-5 sm:p-7 xl:p-6 2xl:p-7">
              <p className="text-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph1")}
              </p>
            </div>

            <div className="about-ceo-card bg-secondary-bg rounded-xl p-5 sm:p-7 xl:p-6 2xl:p-7">
              <p className="text-muted-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph2")}
              </p>
            </div>

            <div className="about-ceo-card bg-secondary-bg rounded-xl p-5 sm:p-7 xl:p-6 2xl:p-7">
              <p className="text-muted-foreground text-justify text-sm leading-7 sm:text-base sm:leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph3")}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2 xl:gap-5 2xl:gap-6">
            <div className="about-ceo-meta bg-secondary-bg rounded-xl px-5 py-5 sm:px-7 sm:py-6 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
              <span className="text-muted-foreground text-sm">
                {t("ceo.focus.label")}
              </span>

              <p className="mt-2 text-sm font-semibold sm:text-base">
                {t("ceo.focus.value")}
              </p>
            </div>

            <div className="about-ceo-meta bg-secondary-bg rounded-xl px-5 py-5 sm:px-7 sm:py-6 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
              <span className="text-muted-foreground text-sm">
                {t("ceo.commitment.label")}
              </span>

              <p className="mt-2 text-sm font-semibold sm:text-base">
                {t("ceo.commitment.value")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutSection;
