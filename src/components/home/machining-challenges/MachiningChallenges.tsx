"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const challenges = [
  {
    id: 1,
    slug: "controlling-chatter-in-milling",
    image: "/home/machining-challenges/chatter.png",
    titleKey: "items.chatter.title",
    descriptionKey: "items.chatter.description",
  },
  {
    id: 2,
    slug: "reducing-tool-wear",
    image: "/home/machining-challenges/tool-wear2.png",
    titleKey: "items.toolWear.title",
    descriptionKey: "items.toolWear.description",
  },
  {
    id: 3,
    slug: "improving-surface-finish",
    image: "/home/machining-challenges/surface-finish.png",
    titleKey: "items.surfaceFinish.title",
    descriptionKey: "items.surfaceFinish.description",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const MachiningChallenges = () => {
  const locale = useLocale();
  const t = useTranslations("Home.MachiningChallenges");

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-24">
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
          className="text-foreground mb-12 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-3 gap-6">
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
              className="group h-full"
            >
              <Link
                href={`/${locale}/machining-challenges/${challenge.slug}`}
                className="flex h-full flex-col"
              >
                {/* Image */}
                <div className="border-border relative aspect-video shrink-0 overflow-hidden rounded-[12px] border">
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
                    <Image
                      src={challenge.image}
                      alt={t(challenge.titleKey)}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex min-h-[235px] flex-1 flex-col pt-6">
                  {/* Fixed title area */}
                  <div className="min-h-[70px]">
                    <h3 className="text-foreground group-hover:text-custom-primary line-clamp-2 text-[24px] leading-[1.45] font-semibold transition-colors duration-500">
                      {t(challenge.titleKey)}
                    </h3>
                  </div>

                  {/* Fixed description area */}
                  <div className="mt-3 min-h-[84px]">
                    <p className="text-muted-foreground line-clamp-3 text-justify text-[15px] leading-7">
                      {t(challenge.descriptionKey)}
                    </p>
                  </div>

                  {/* Always aligned at bottom */}
                  <div className="mt-auto pt-5">
                    <div className="text-custom-primary inline-flex items-center gap-2 text-[15px] font-medium">
                      <span>{t("readMore")}</span>

                      <ArrowIcon
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-500 group-hover:-translate-y-1"
                      />
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
