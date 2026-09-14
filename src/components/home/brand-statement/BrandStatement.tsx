"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const BrandStatement = () => {
  const locale = useLocale();
  const t = useTranslations("Home.BrandStatement");

  const isRTL = locale === "fa";

  const sloganWords = t("slogan")
    .split(isRTL ? "،" : ",")
    .map((word) => word.trim());

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-20">
        <div className="border-border relative overflow-hidden rounded-2xl border">
          <div className="bg-custom-primary/6 pointer-events-none absolute -start-32 -top-32 size-[420px] rounded-full blur-[120px]" />

          <div className="relative grid min-h-[520px] grid-cols-[0.95fr_1.05fr] items-center gap-16 px-12 py-14">
            {/* Slogan */}
            <motion.div
              initial={{
                opacity: 0,
                x: isRTL ? 35 : -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="flex flex-col">
                {sloganWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-foreground hover:text-custom-primary cursor-default text-[64px] leading-[1.12] font-semibold transition-colors duration-300"
                  >
                    {word}
                    {index !== sloganWords.length - 1 && (
                      <span className="text-custom-primary">،</span>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{
                opacity: 0,
                x: isRTL ? -35 : 35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-border border-s ps-12"
            >
              <h2 className="text-foreground max-w-2xl text-[32px] leading-[1.45] font-semibold">
                {t("title")}
              </h2>

              <p className="text-muted-foreground mt-7 max-w-2xl text-justify text-[16px] leading-8">
                {t("description")}
              </p>

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-custom-primary origin-start mt-9 h-1 w-24 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
