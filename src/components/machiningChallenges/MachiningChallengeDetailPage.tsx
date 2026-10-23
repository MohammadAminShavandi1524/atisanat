"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import ChallengeSection from "@/components/machiningChallenges/ChallengeSection";
import ChallengeFooter from "@/components/machiningChallenges/ChallengeFooter";
import { animateMachiningChallengesPage } from "@/components/machiningChallenges/machiningChallengesAnimations";

import {
  BLOG_READ_TIME,
  getLatestBlogs,
  getBlogChildren,
  getRelatedBlogs,
  type BlogDetails,
  type ParentBlog,
} from "./machining-challenges.api";

const MachiningChallengeDetailPage = () => {
  const locale = useLocale();
  const params = useParams();

  const rootRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("MachiningChallengesPage.article");

  const slug = params.slug as string;
  const isRTL = locale === "fa";
  const lang = isRTL ? "fa" : "en";

  const [details, setDetails] = useState<BlogDetails | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<ParentBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDetails = async () => {
      setLoading(true);
      setDetails(null);
      setRelatedBlogs([]);

      try {
        // Find the selected article by its URL slug.
        const blogs = await getLatestBlogs(lang, controller.signal);

        const normalizedSlug = (() => {
          try {
            return decodeURIComponent(slug);
          } catch {
            return slug;
          }
        })();

        const selectedBlog = blogs.find((blog) => blog.slug === normalizedSlug);

        if (!selectedBlog) {
          return;
        }

        // Both language versions are returned by children.
        const childrenResponse = await getBlogChildren(
          selectedBlog.id,
          controller.signal,
        );

        if (controller.signal.aborted) return;

        const selectedDetails = childrenResponse[lang];

        if (selectedDetails?.parent?.id !== selectedBlog.id) {
          console.error(
            "BLOG DETAILS ERROR =>",
            "Article language or ID mismatch",
          );
          return;
        }

        setDetails(selectedDetails);

        // Related articles are an independent request.
        // An empty response is valid.
        try {
          const related = await getRelatedBlogs(
            selectedBlog.id,
            controller.signal,
          );

          if (!controller.signal.aborted) {
            setRelatedBlogs(
              related.filter(
                (blog) =>
                  blog.id !== selectedBlog.id &&
                  blog.lang === lang &&
                  blog.published,
              ),
            );
          }
        } catch (error) {
          if (!controller.signal.aborted) {
            console.error("RELATED BLOGS ERROR =>", error);
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("BLOG DETAILS ERROR =>", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDetails();

    return () => controller.abort();
  }, [lang, slug]);

  useEffect(() => {
    if (!rootRef.current || !details || loading) {
      return;
    }

    return animateMachiningChallengesPage(rootRef.current);
  }, [locale, slug, details, loading]);

  if (loading || !details) {
    return null;
  }

  const challenge = details.parent;

  const title = challenge.title;
  const description = challenge.description;
  const category = challenge.category.name;
  const tags = challenge.tags;

  return (
    <div ref={rootRef} dir={isRTL ? "rtl" : "ltr"} className="bg-background">
      {/* Challenge Hero */}
      <section className="w90 py-10 sm:py-14 md:py-16 lg:py-18 xl:py-20">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-12 2xl:gap-16">
          {/* Content */}
          <div className="challenge-hero-content min-w-0 lg:pe-5 xl:pe-6 2xl:pe-8">
            <h1 className="text-foreground xss:text-[33px] max-w-3xl text-[30px] leading-[1.3] font-semibold sm:text-[36px] sm:leading-[1.25] md:text-[38px] lg:text-[36px] xl:text-[40px] xl:leading-[1.2]">
              {title}
            </h1>

            <p className="text-muted-foreground mt-5 max-w-3xl text-justify text-sm leading-7 sm:mt-6 sm:text-[15px] sm:leading-7.5 xl:mt-7 xl:text-base xl:leading-8">
              {description}
            </p>

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
                {BLOG_READ_TIME} {t("readTime")}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="challenge-hero-image border-border relative aspect-[16/9] w-full overflow-hidden rounded-2xl border">
            {challenge.image && (
              <Image
                alt={title}
                src={challenge.image}
                fill
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="object-cover"
                priority
                unoptimized
              />
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w90 py-12 sm:py-16 md:py-20 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 items-start gap-12 md:gap-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12 2xl:grid-cols-[minmax(0,1fr)_360px] 2xl:gap-16">
          {/* Main Content */}
          <div className="challenge-content border-border min-w-0 lg:border-e lg:pe-8 xl:pe-10 2xl:pe-14">
            {details.child.map((section) => (
              <ChallengeSection
                key={section.id}
                title={section.title}
                description={section.description}
                image={section.image ?? undefined}
              />
            ))}
          </div>

          {/* Related Challenges */}
          <aside className="challenge-related lg:sticky lg:top-16">
            <div className="border-border overflow-hidden rounded-2xl border">
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

              <div className="px-4 sm:px-5 xl:px-6">
                {relatedBlogs.map((related) => {
                  const relatedTitle = related.title;
                  const relatedCategory = related.category.name;

                  return (
                    <Link
                      key={related.id}
                      href={`/${locale}/machining-challenges/${encodeURIComponent(related.slug)}`}
                      className="group/news border-border flex items-center gap-3 border-b py-4 last:border-b-0 sm:gap-4 sm:py-5"
                    >
                      <div className="border-border xss:w-28 relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-lg border lg:w-24 xl:w-28">
                        {related.image && (
                          <Image
                            src={related.image}
                            alt={relatedTitle}
                            fill
                            sizes="112px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>

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
