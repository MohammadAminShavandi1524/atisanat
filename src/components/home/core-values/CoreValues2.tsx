"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const values = [
  "precision",
  "infrastructure",
  "strategicIndustries",
  "noShortcuts",
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const CoreValues2 = () => {
  const t = useTranslations("Home.CoreValues");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getColumns = () => {
    if (activeIndex === null) {
      return "25% 25% 25% 25%";
    }

    return values
      .map((_, index) => (index === activeIndex ? "40%" : "20%"))
      .join(" ");
  };

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
          className="text-foreground mb-10 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <motion.div
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease,
          }}
        >
          <motion.div
            initial={false}
            animate={{
              gridTemplateColumns: getColumns(),
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            onMouseLeave={() => setActiveIndex(null)}
            className="border-border grid h-[245px] overflow-hidden rounded-2xl border"
          >
            {values.map((value, index) => {
              const isActive = activeIndex === index;
              const hasActive = activeIndex !== null;
              const isInactive = hasActive && !isActive;

              return (
                <article
                  key={value}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={[
                    "group relative min-w-0 overflow-hidden",
                    index !== values.length - 1
                      ? "border-border border-e"
                      : "",
                  ].join(" ")}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                    className="bg-custom-primary/5 absolute inset-0"
                  />

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isInactive ? 0.55 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                    className="relative z-10 h-full p-8"
                  >
                    <motion.h3
                      initial={false}
                      animate={{
                        y: isActive ? -8 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease,
                      }}
                      className="text-foreground text-[23px] leading-[1.4] font-semibold"
                    >
                      {t(`${value}.title`)}
                    </motion.h3>

                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 14,
                      }}
                      transition={{
                        opacity: {
                          duration: 0.45,
                          delay: isActive ? 0.18 : 0,
                          ease,
                        },
                        y: {
                          duration: 0.6,
                          delay: isActive ? 0.1 : 0,
                          ease,
                        },
                      }}
                      className="text-muted-foreground mt-5 max-w-[520px] text-justify text-[15px] leading-7"
                    >
                      {t(`${value}.description`)}
                    </motion.p>
                  </motion.div>
                </article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues2;