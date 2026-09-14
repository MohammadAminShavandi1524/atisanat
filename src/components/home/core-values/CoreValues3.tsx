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

const CoreValues3 = () => {
  const t = useTranslations("Home.CoreValues");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            duration: 0.7,
            ease,
          }}
          className="text-foreground mb-10 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            ease,
          }}
          onMouseLeave={() => setActiveIndex(null)}
          className="border-border grid grid-cols-4 overflow-hidden rounded-2xl border"
        >
          {values.map((value, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                key={value}
                onMouseEnter={() => setActiveIndex(index)}
                initial={{
                  opacity: 0,
                  y: 24,
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
                  duration: 0.7,
                  delay: index * 0.07,
                  ease,
                }}
                className={[
                  "relative h-[250px] min-w-0 overflow-hidden",
                  index !== values.length - 1 ? "border-border border-e" : "",
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

                {/* Title */}
                <motion.div
                  initial={false}
                  animate={{
                    y: isActive ? -56 : 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease,
                  }}
                  className="absolute inset-x-8 top-1/2 z-10 -translate-y-1/2"
                >
                  <motion.h3
                    initial={false}
                    animate={{
                      color: isActive
                        ? "var(--custom-primary)"
                        : "var(--foreground)",
                    }}
                    transition={{
                      duration: 0.45,
                      ease,
                    }}
                    className="text-[23px] leading-[1.4] font-semibold"
                  >
                    {t(`${value}.title`)}
                  </motion.h3>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 32,
                  }}
                  transition={{
                    opacity: {
                      duration: isActive ? 0.48 : 0.25,
                      delay: isActive ? 0.08 : 0,
                      ease,
                    },
                    y: {
                      duration: 0.65,
                      ease,
                    },
                  }}
                  className="absolute inset-x-8 bottom-13 z-10"
                >
                  <p className="text-muted-foreground text-justify text-[15px] leading-7">
                    {t(`${value}.description`)}
                  </p>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.85,
                  }}
                  transition={{
                    duration: 0.7,
                    ease,
                  }}
                  className="bg-custom-primary/5 pointer-events-none absolute -bottom-24 left-1/2 size-[220px] -translate-x-1/2 rounded-full blur-[70px]"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues3;
