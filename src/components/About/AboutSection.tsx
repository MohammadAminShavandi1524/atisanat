"use client";

import { useRef } from "react";

import { Quote } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutSection = () => {
  const t = useTranslations("About");
  const locale = useLocale();

  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        ".about-hero",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    },
    {
      scope: rootRef,
      dependencies: [locale],
    },
  );

  return (
    <main
      ref={rootRef}
      className="bg-background text-foreground overflow-hidden"
    >
      {/* Hero */}
      <section className="about-hero">
        <div className="w90 3xl:py-24 mx-auto py-20 xl:py-16 2xl:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 xl:gap-12 2xl:gap-16">
            <div>
              <h1 className="3xl:text-[56px] text-[48px] leading-[1.12] font-semibold tracking-[-0.04em] xl:text-[42px] 2xl:text-[50px]">
                {t("hero.slogan")}
              </h1>

              <p className="text-muted-foreground mt-6 text-base leading-8 xl:mt-5 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("hero.description")}
              </p>
            </div>

            <div className="bg-secondary-bg 3xl:p-10 rounded-2xl p-8 xl:p-6 2xl:p-8">
              <h2 className="3xl:text-[27px] text-2xl leading-[1.5] font-semibold tracking-[-0.025em] xl:text-xl 2xl:text-[24px]">
                {t("hero.title")}
              </h2>

              <p className="text-muted-foreground mt-5 text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("hero.summary")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-reveal bg-secondary-bg">
        <div className="w90 3xl:py-24 mx-auto py-20 xl:py-16 2xl:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] xl:gap-12 2xl:gap-16">
            <div>
              <h2 className="3xl:text-[38px] text-[34px] leading-[1.35] font-semibold tracking-[-0.03em] xl:text-[28px] 2xl:text-[34px]">
                {t("introduction.title")}
              </h2>
            </div>

            <div className="grid gap-7 md:grid-cols-2 xl:gap-8 2xl:gap-10">
              <div className="bg-background rounded-xl p-7 xl:p-6 2xl:p-7">
                <p className="text-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph1")}
                </p>
              </div>

              <div className="bg-background rounded-xl p-7 xl:p-6 2xl:p-7">
                <p className="text-muted-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph2")}
                </p>
              </div>

              <div className="bg-background rounded-xl p-7 md:col-span-2 xl:p-6 2xl:p-7">
                <p className="text-muted-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                  {t("introduction.paragraph3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="about-reveal">
        <div className="w90 3xl:py-24 mx-auto py-20 xl:py-16 2xl:py-20">
          <div className="mb-10 flex items-center gap-5 xl:mb-8">
            <div className="bg-secondary-bg flex size-12 shrink-0 items-center justify-center rounded-lg">
              <Quote className="text-custom-primary size-5" strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-custom-primary text-sm font-medium">
                {t("ceo.role")}
              </p>

              <h2 className="3xl:text-[38px] mt-1.5 text-[34px] leading-[1.3] font-semibold tracking-[-0.03em] xl:text-[28px] 2xl:text-[34px]">
                {t("ceo.title")}
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 xl:gap-5 2xl:gap-6">
            <div className="bg-secondary-bg rounded-xl p-7 xl:p-6 2xl:p-7">
              <p className="text-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph1")}
              </p>
            </div>

            <div className="bg-secondary-bg rounded-xl p-7 xl:p-6 2xl:p-7">
              <p className="text-muted-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph2")}
              </p>
            </div>

            <div className="bg-secondary-bg rounded-xl p-7 xl:p-6 2xl:p-7">
              <p className="text-muted-foreground text-base leading-8 xl:text-[14px] xl:leading-7 2xl:text-[15px] 2xl:leading-8">
                {t("ceo.paragraph3")}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:gap-5 2xl:gap-6">
            <div className="bg-secondary-bg rounded-xl px-7 py-6 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
              <span className="text-muted-foreground text-sm">
                {t("ceo.focus.label")}
              </span>

              <p className="mt-2 text-base font-semibold">
                {t("ceo.focus.value")}
              </p>
            </div>

            <div className="bg-secondary-bg rounded-xl px-7 py-6 xl:px-6 xl:py-5 2xl:px-7 2xl:py-6">
              <span className="text-muted-foreground text-sm">
                {t("ceo.commitment.label")}
              </span>

              <p className="mt-2 text-base font-semibold">
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
