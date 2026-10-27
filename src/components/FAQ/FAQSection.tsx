"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import FAQItem from "./FAQItem";
import { getFAQs, type FAQ } from "./faq.api";
import { animateFAQPage } from "./faqAnimations";

const FAQSection = () => {
  const locale = useLocale();
  const t = useTranslations("FAQ");

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [faqItems, setFaqItems] = useState<FAQ[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFAQs = async () => {
      setLoading(true);

      try {
        const data = await getFAQs(controller.signal);

        if (!controller.signal.aborted) {
          setFaqItems(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("GET FAQ ERROR =>", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFAQs();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current || loading) return;

    return animateFAQPage(rootRef.current, isRTL);
  }, [isRTL, loading, faqItems]);

  return (
    <section
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background"
    >
      <div className="w90 py-10 sm:py-14 lg:py-16">
        <div className="faq-intro border-b-border w-full border-b">
          <div className="max-w-4xl pb-8 sm:pb-10">
            <h1 className="text-foreground text-[32px] leading-[1.2] font-semibold sm:text-[38px] lg:text-[42px]">
              {t("title")}
            </h1>

            <p className="text-muted-foreground mt-4 max-w-3xl text-justify text-sm leading-7 sm:mt-5 sm:text-[15px] sm:leading-8 lg:text-[16px]">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 sm:mt-12 sm:gap-12 lg:mt-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <aside className="faq-aside lg:sticky lg:top-28">
            <h2 className="text-foreground text-[24px] leading-[1.3] font-semibold sm:text-[28px]">
              {t("sectionTitle")}
            </h2>

            <p className="text-muted-foreground mt-4 max-w-md text-justify text-sm leading-7 sm:mt-5 sm:text-[15px] sm:leading-8">
              {t("sectionDescription")}
            </p>

            <Link
              href={`/${locale}/contact-us`}
              className="group mt-6 inline-flex items-center gap-3 sm:mt-8"
            >
              <span className="text-foreground group-hover:text-custom-primary text-sm font-medium transition-colors duration-300 sm:text-[15px]">
                {t("contact")}
              </span>

              <span className="border-border group-hover:border-custom-primary group-hover:bg-custom-primary flex size-10 items-center justify-center rounded-lg border transition-all duration-300 group-hover:text-white">
                <ArrowIcon className="size-4" />
              </span>
            </Link>
          </aside>

          <div className="faq-list space-y-3" aria-busy={loading}>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-border bg-card flex min-h-[72px] items-center justify-between gap-4 rounded-xl border px-4 py-4 sm:min-h-[82px] sm:gap-6 sm:px-6 sm:py-5"
                    aria-hidden="true"
                  >
                    <div
                      className={`bg-secondary-bg h-4 animate-pulse rounded-md sm:h-5 ${
                        index % 3 === 0
                          ? "w-[75%]"
                          : index % 3 === 1
                            ? "w-[58%]"
                            : "w-[68%]"
                      }`}
                    />

                    <div className="border-border bg-secondary-bg size-9 shrink-0 animate-pulse rounded-lg border sm:size-10" />
                  </div>
                ))
              : faqItems.map((item, index) => (
                  <div key={item.id} className="faq-list-item">
                    <FAQItem
                      id={item.id}
                      question={isRTL ? item.question_fa : item.question_en}
                      answer={isRTL ? item.answer_fa : item.answer_en}
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
