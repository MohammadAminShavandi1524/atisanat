"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import { machiningChallenges } from "@/data/machining-challenges.data";

const MachiningChallengesPage = () => {
  const locale = useLocale();
  const t = useTranslations("MachiningChallengesPage");

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      {/* Header */}
      <section className="w90 pt-20">
        <div className="border-border bg-secondary-bg relative overflow-hidden rounded-2xl border">
          <div className="relative z-10 grid min-h-[300px] grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:p-12 xl:min-h-[330px] xl:gap-16 xl:p-14 2xl:p-16">
            {/* Title */}
            <div className="min-w-0">
              <h1 className="text-foreground max-w-xl text-[36px] leading-[1.15] font-semibold sm:text-[42px] lg:text-[46px] xl:text-[50px]">
                {t("title")}
              </h1>
            </div>

            {/* Description */}
            <div className="border-border min-w-0 lg:border-s lg:ps-10 xl:ps-14">
              <p className="text-muted-foreground max-w-3xl text-justify text-sm leading-7 sm:text-[15px] sm:leading-7.5 xl:text-base xl:leading-8">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Background Details */}
          <div className="bg-custom-primary/8 pointer-events-none absolute -start-24 -bottom-32 size-[360px] rounded-full blur-[120px]" />

          <div className="bg-custom-primary/5 pointer-events-none absolute -end-28 -top-24 size-[300px] rounded-full blur-[110px]" />
        </div>
      </section>

      {/* Challenges */}
      <section className="w90 py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:gap-10">
          {machiningChallenges.map((challenge) => {
            const title = isRTL ? challenge.title.fa : challenge.title.en;

            const description = isRTL
              ? challenge.description.fa
              : challenge.description.en;

            const category = isRTL
              ? challenge.category.fa
              : challenge.category.en;

            const tags = isRTL ? challenge.tags.fa : challenge.tags.en;

            const visibleTags = Array.from(new Set([category, ...tags])).slice(
              0,
              3,
            );

            const href = `/${locale}/machining-challenges/${challenge.slug}`;

            return (
              <article
                key={challenge.id}
                className="border-border bg-card flex min-w-0 flex-col overflow-hidden rounded-2xl border"
              >
                {/* Image */}
                <Link
                  href={href}
                  className="relative block aspect-[16/9] w-full overflow-hidden"
                >
                  <Image
                    src={challenge.image}
                    alt={title}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7 xl:p-8">
                  {/* Tags */}
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {visibleTags.map((tag) => (
                      <span
                        key={tag}
                        className="border-border bg-secondary-bg text-muted-foreground rounded-lg border px-2.5 py-1.5 text-[11px] sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <Link href={href} className="group/title">
                    <h2 className="text-foreground group-hover/title:text-custom-primary text-[21px] leading-[1.45] font-semibold transition-colors duration-300 sm:text-[23px] xl:text-[24px]">
                      {title}
                    </h2>
                  </Link>

                  {/* Description */}
                  <p className="text-muted-foreground mt-4 line-clamp-3 text-justify text-sm leading-7 sm:text-[15px] sm:leading-7.5">
                    {description}
                  </p>

                  {/* Footer */}
                  <div className="border-border mt-7 flex items-center justify-between border-t pt-5">
                    <span className="text-muted-foreground text-xs sm:text-[13px]">
                      {challenge.readTime} {t("article.readTime")}
                    </span>

                    <Link
                      href={href}
                      className="text-foreground hover:text-custom-primary inline-flex items-center gap-2.5 text-sm font-medium transition-colors duration-300"
                    >
                      <span>{t("readMore")}</span>

                      <ArrowIcon className="size-4" strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default MachiningChallengesPage;
