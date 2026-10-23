"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import {
  getLatestBlogs,
  type ParentBlog,
} from "@/components/machiningChallenges/machining-challenges.api";

const ease = [0.16, 1, 0.3, 1] as const;

const MachiningChallenges = () => {
  const locale = useLocale();
  const t = useTranslations("Home.MachiningChallenges");

  const [challenges, setChallenges] = useState<ParentBlog[]>([]);

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    const controller = new AbortController();

    const fetchChallenges = async () => {
      try {
        const data = await getLatestBlogs(locale, controller.signal);

        if (!controller.signal.aborted) {
          setChallenges(data.slice(0, 3));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("HOME MACHINING CHALLENGES ERROR =>", error);
        }
      }
    };

    fetchChallenges();

    return () => {
      controller.abort();
    };
  }, [locale]);

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-24">
        <motion.h2
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="text-foreground mb-8 text-[28px] leading-[1.2] font-semibold sm:mb-10 sm:text-[32px] lg:mb-12 lg:text-[36px] 2xl:text-[40px]"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-6 lg:gap-y-0">
          {challenges.map((challenge, index) => (
            <motion.article
              key={challenge.id}
              initial={{
                opacity: 0,
                y: 34,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.75,
                delay: index * 0.09,
                ease,
              }}
              className="group bg-secondary-bg shadow-primary h-full min-w-0 overflow-hidden rounded-[12px] lg:row-span-4 lg:grid lg:grid-rows-[subgrid]"
            >
              <Link
                href={`/${locale}/machining-challenges/${encodeURIComponent(challenge.slug)}`}
                className="flex h-full min-w-0 flex-col lg:row-span-4 lg:grid lg:grid-rows-[subgrid]"
              >
                {/* Image */}
                <div className="relative aspect-video shrink-0 overflow-hidden">
                  <motion.div
                    whileHover={{
                      scale: 1.055,
                    }}
                    transition={{
                      duration: 0.85,
                      ease,
                    }}
                    className="absolute inset-0"
                  >
                    {challenge.image && (
                      <Image
                        src={challenge.image}
                        alt={challenge.title}
                        fill
                        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex min-h-[200px] flex-1 flex-col px-4 pt-5 pb-5 sm:min-h-[215px] sm:px-5 sm:pt-6 sm:pb-6 lg:contents">
                  {/* Title */}
                  <div className="lg:px-5 lg:pt-6">
                    <h3 className="text-foreground group-hover:text-custom-primary line-clamp-2 pb-2 text-[20px] leading-[1.45] font-semibold transition-colors duration-500 sm:text-[18px] xl:text-xl">
                      {challenge.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="mt-2 min-h-0 sm:mt-3 sm:min-h-[84px] lg:mt-0 lg:min-h-0 lg:px-5 lg:pt-3">
                    <p className="text-muted-foreground line-clamp-3 text-justify text-[14px] leading-6 sm:text-[15px] sm:leading-7">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Read More */}
                  <div className="mt-auto pt-4 sm:pt-5 lg:mt-0 lg:px-5 lg:pb-6">
                    <div className="text-custom-primary inline-flex items-center gap-2 text-[14px] font-medium sm:text-[15px]">
                      <span>{t("readMore")}</span>

                      <ArrowIcon strokeWidth={1.8} className="size-4.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachiningChallenges;
