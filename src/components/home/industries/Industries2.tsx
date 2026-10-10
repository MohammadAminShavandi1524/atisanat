"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const industries = [
  {
    id: "automotive",
    image: "/home/industries/automotive.webp",
    className: "col-span-2 sm:col-span-2 lg:col-span-3",
  },
  {
    id: "power",
    image: "/home/industries/Power.webp",
    className: "col-span-2 s:col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    id: "machinery",
    image: "/home/industries/Gearbox.webp",
    className: "col-span-2 s:col-span-1 sm:col-span-4 lg:col-span-4",
  },
  {
    id: "steel",
    image: "/home/industries/steel.webp",
    className: "col-span-2 sm:col-span-2 lg:col-span-3",
  },
  {
    id: "mold",
    image: "/home/industries/mold.webp",
    className: "col-span-2 s:col-span-1 sm:col-span-2 lg:col-span-3",
  },
  {
    id: "oilGas",
    image: "/home/industries/oil.webp",
    className: "col-span-2 s:col-span-1 sm:col-span-2 lg:col-span-4",
  },
  {
    id: "railway",
    image: "/home/industries/Railway.webp",
    className: "col-span-2 sm:col-span-2 lg:col-span-3",
  },
  {
    id: "aerospace",
    image: "/home/industries/aerospace.webp",
    className: "col-span-2 sm:col-span-4 lg:col-span-2",
  },
] as const;

const Industries2 = () => {
  const t = useTranslations("Home.Industries");

  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  return (
    <section className="bg-secondary-bg overflow-hidden">
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-24">
        <motion.h2
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

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          onMouseLeave={() => setActiveIndustry(null)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-12"
        >
          {industries.map((industry, index) => {
            const isActive = activeIndustry === industry.id;
            const hasActive = activeIndustry !== null;
            const isInactive = hasActive && !isActive;

            const isFirstRow = index < 4;

            return (
              <motion.article
                key={industry.id}
                onMouseEnter={() => setActiveIndustry(industry.id)}
                initial={{
                  opacity: 0,
                  y: 32,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                animate={{
                  opacity: isInactive ? 0.58 : 1,
                  y: isActive ? -6 : 0,
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    ease,
                  },
                  y: {
                    duration: 0.65,
                    delay: activeIndustry === null ? index * 0.045 : 0,
                    ease,
                  },
                }}
                className={[
                  industry.className,
                  isFirstRow
                    ? "h-[220px] sm:h-[280px] lg:h-[300px] 2xl:h-[340px]"
                    : "h-[240px] sm:h-[280px] lg:h-[340px] 2xl:h-[390px]",
                  "border-border bg-card group relative cursor-pointer overflow-hidden rounded-[12px] border",
                ].join(" ")}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.065 : 1,
                  }}
                  transition={{
                    duration: 0.95,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={industry.image}
                    alt={t(`items.${industry.id}`)}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.76 : 0.52,
                  }}
                  transition={{
                    duration: 0.5,
                    ease,
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 lg:p-5 2xl:p-6">
                  <motion.div
                    initial={false}
                    animate={{
                      y: isActive ? -5 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease,
                    }}
                  >
                    <h3 className="text-[15px] leading-[1.35] font-semibold text-white sm:text-[17px] lg:text-[18px] 2xl:text-[20px]">
                      {t(`items.${industry.id}`)}
                    </h3>
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease,
                  }}
                  className="border-custom-primary pointer-events-none absolute inset-0 rounded-[12px] border"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries2;
