"use client";

import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import ChallengeSection from "@/components/machiningChallenges/ChallengeSection";
import ChallengeFooter from "@/components/machiningChallenges/ChallengeFooter";

import {
  getMachiningChallengeBySlug,
  getRelatedMachiningChallenges,
} from "@/data/machining-challenges.data";

const MachiningChallengeDetailPage = () => {
  const locale = useLocale();

  const t = useTranslations("MachiningChallengesPage.article");

  const params = useParams();

  const slug = params.slug as string;

  const challenge = getMachiningChallengeBySlug(slug);

  if (!challenge) {
    return null;
  }

  const isRTL = locale === "fa";

  const title = isRTL ? challenge.title.fa : challenge.title.en;

  const description = isRTL
    ? challenge.description.fa
    : challenge.description.en;

  const category = isRTL ? challenge.category.fa : challenge.category.en;

  const tags = isRTL ? challenge.tags.fa : challenge.tags.en;

  const relatedChallenges = getRelatedMachiningChallenges(slug);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-background">
      {/* Challenge Hero */}
      <section className="w90 py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-12 2xl:gap-16">
          {/* Content */}
          <div className="min-w-0 lg:pe-5 xl:pe-6 2xl:pe-8">
            {/* Title */}
            <h1 className="text-foreground xss:text-[33px] max-w-3xl text-[30px] leading-[1.3] font-semibold sm:text-[36px] sm:leading-[1.25] md:text-[38px] lg:text-[36px] xl:text-[40px] xl:leading-[1.2]">
              {title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mt-5 max-w-3xl text-justify text-sm leading-7 sm:mt-6 sm:text-[15px] sm:leading-7.5 xl:mt-7 xl:text-base xl:leading-8">
              {description}
            </p>

            {/* Meta */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4 xl:mt-9">
              <span className="border-border bg-secondary-bg text-muted-foreground rounded-lg border px-3 py-1.5 text-xs sm:text-[13px]">
                {category}
              </span>

              <span className="text-muted-foreground text-xs sm:text-sm">
                {t("preparedBy")}
                <span className="text-foreground ms-2 font-medium">
                  {t("author")}
                </span>
              </span>

              <span className="text-muted-foreground text-xs sm:text-sm">
                {challenge.readTime} {t("readTime")}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="border-border relative aspect-[16/9] w-full overflow-hidden rounded-2xl border">
            <Image
              alt={title}
              src={challenge.image}
              fill
              sizes="(max-width: 1023px) 100vw, 52vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w90 py-14 sm:py-16 md:py-20 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 items-start gap-14 md:gap-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:gap-16">
          {/* Main Content */}
          <div className="border-border min-w-0 lg:border-e lg:pe-8 xl:pe-10 2xl:pe-14">
            {challenge.sections.map((section) => (
              <ChallengeSection
                key={section.id}
                title={isRTL ? section.title.fa : section.title.en}
                description={
                  isRTL ? section.description.fa : section.description.en
                }
                image={section.image}
              />
            ))}
          </div>

          {/* Related Challenges */}
          <aside className="lg:sticky lg:top-16">
            <div className="border-border overflow-hidden rounded-2xl border">
              {/* Heading */}
              <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 sm:px-5 sm:py-5 xl:px-6">
                <span className="text-foreground text-sm font-semibold sm:text-base">
                  {t("moreChallenges")}
                </span>

                <Link
                  href={`/${locale}/machining-challenges`}
                  className="text-muted-foreground hover:text-custom-primary flex items-center gap-2 text-xs transition-colors duration-300 sm:text-sm"
                >
                  <span>{t("viewAll")}</span>

                  <ArrowLeft className="size-4 ltr:rotate-180" />
                </Link>
              </div>

              {/* Related */}
              <div className="px-4 sm:px-5 xl:px-6">
                {relatedChallenges.map((related) => {
                  const relatedTitle = isRTL
                    ? related.title.fa
                    : related.title.en;

                  const relatedCategory = isRTL
                    ? related.category.fa
                    : related.category.en;

                  return (
                    <Link
                      key={related.id}
                      href={`/${locale}/machining-challenges/${related.slug}`}
                      className="group/news border-border flex items-center gap-3 border-b py-4 last:border-b-0 sm:gap-4 sm:py-5"
                    >
                      {/* Image */}
                      <div className="border-border xss:w-28 relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-lg border lg:w-24 xl:w-28">
                        <Image
                          src={related.image}
                          alt={relatedTitle}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span className="text-muted-foreground text-[11px] font-medium sm:text-xs">
                          {relatedCategory}
                        </span>

                        <h3 className="text-foreground group-hover/news:text-custom-primary mt-1.5 line-clamp-2 text-[13px] leading-5 font-medium transition-colors duration-300 sm:mt-2 sm:text-sm sm:leading-6">
                          {relatedTitle}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <ChallengeFooter tags={tags} />
      </section>
    </div>
  );
};

export default MachiningChallengeDetailPage;
