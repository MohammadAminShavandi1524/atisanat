"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FAQItem from "./FAQItem";
import { faqItems } from "./faq.data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQSection = () => {
  const locale = useLocale();
  const t = useTranslations("FAQ");

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!introRef.current || !asideRef.current || !listRef.current) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        introRef.current.children,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        asideRef.current.children,
        {
          opacity: 0,
          x: isRTL ? 30 : -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: asideRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      const items = listRef.current.querySelectorAll(".faq-list-item");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    {
      scope: rootRef,
      dependencies: [isRTL],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background"
    >
      <div className="w90 py-16">
        <div ref={introRef} className="border-b-border border-b w-full">
          <div  className="max-w-4xl pb-10">
            <h1 className="text-foreground text-[42px] leading-[1.2] font-semibold">
              {t("title")}
            </h1>

            <p className="text-muted-foreground mt-5 max-w-3xl text-justify text-[16px] leading-8">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[0.8fr_1.6fr] items-start gap-16">
          <aside>
            <div ref={asideRef} className="sticky top-28">
              <h2 className="text-foreground text-[28px] leading-[1.3] font-semibold">
                {t("sectionTitle")}
              </h2>

              <p className="text-muted-foreground mt-5 max-w-md text-justify text-[15px] leading-8">
                {t("sectionDescription")}
              </p>

              <Link
                href={`/${locale}/contact-us`}
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="text-foreground group-hover:text-custom-primary text-[15px] font-medium transition-colors duration-300">
                  {t("contact")}
                </span>

                <span className="border-border group-hover:border-custom-primary group-hover:bg-custom-primary flex size-10 items-center justify-center rounded-lg border transition-all duration-300 group-hover:text-white">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </div>
          </aside>

          <div ref={listRef} className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={item.id} className="faq-list-item">
                <FAQItem
                  id={item.id}
                  question={item.question[isRTL ? "fa" : "en"]}
                  answer={item.answer[isRTL ? "fa" : "en"]}
                  isOpen={activeIndex === index}
                  onToggle={() => {
                    setActiveIndex((current) =>
                      current === index ? null : index,
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
