"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const BrandStatement2 = () => {
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
          <div className="bg-custom-primary/5 pointer-events-none absolute -top-32 left-1/2 size-[500px] -translate-x-1/2 rounded-full blur-[120px]" />

          {/* Slogan */}
          <div className="border-border relative grid grid-cols-3 border-b">
            {sloganWords.map((word, index) => (
              <motion.div
                key={`${word}-${index}`}
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "group flex min-h-[220px] items-center justify-center px-8",
                  index !== sloganWords.length - 1
                    ? "border-border border-e"
                    : "",
                ].join(" ")}
              >
                <span className="text-foreground group-hover:text-custom-primary text-[56px] leading-none font-semibold transition-colors duration-300">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative grid grid-cols-[0.85fr_1.15fr] items-start gap-16 px-12 py-14">
            <motion.div
              initial={{
                opacity: 0,
                x: isRTL ? 30 : -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2 className="text-foreground text-[32px] leading-[1.45] font-semibold">
                {t("title")}
              </h2>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: isRTL ? -30 : 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <p className="text-muted-foreground max-w-3xl text-justify text-[16px] leading-8">
                {t("description")}
              </p>

              <motion.span
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
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-custom-primary origin-start mt-8 block h-1 w-24 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement2;
