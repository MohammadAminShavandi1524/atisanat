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
    aspect: "4 / 3",
    position: {
      width: "26%",
      left: "2%",
      top: "9%",
    },
    rotate: -1.8,
    zIndex: 4,
  },
  {
    id: "oilGas",
    image: "/home/industries/oil.webp",
    aspect: "3 / 2",
    position: {
      width: "34%",
      left: "28%",
      top: "1%",
    },
    rotate: 1,
    zIndex: 5,
  },
  {
    id: "power",
    image: "/home/industries/Power.webp",
    aspect: "3 / 4",
    position: {
      width: "17%",
      left: "62.5%",
      top: "7%",
    },
    rotate: -1.2,
    zIndex: 8,
  },
  {
    id: "railway",
    image: "/home/industries/Railway.webp",
    aspect: "4 / 3",
    position: {
      width: "23%",
      right: "0.5%",
      top: "15%",
    },
    rotate: 1.5,
    zIndex: 6,
  },
  {
    id: "machinery",
    image: "/home/industries/Gearbox.webp",
    aspect: "1 / 1",
    position: {
      width: "22%",
      left: "6%",
      top: "54%",
    },
    rotate: 1.3,
    zIndex: 4,
  },
  {
    id: "steel",
    image: "/home/industries/steel.webp",
    aspect: "4 / 3",
    position: {
      width: "28%",
      left: "31%",
      top: "53%",
    },
    rotate: -1.1,
    zIndex: 5,
  },
  {
    id: "mold",
    image: "/home/industries/mold.webp",
    aspect: "3 / 4",
    position: {
      width: "16.5%",
      left: "61%",
      top: "51%",
    },
    rotate: 1.3,
    zIndex: 7,
  },
  {
    id: "aerospace",
    image: "/home/industries/aerospace.webp",
    aspect: "3 / 4",
    position: {
      width: "17.5%",
      right: "2%",
      top: "55%",
    },
    rotate: -1.2,
    zIndex: 6,
  },
] as const;

const Industries = () => {
  const t = useTranslations("Home.Industries");

  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-24">
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
          className="text-foreground mb-12 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <div
          className="relative h-[820px] w-full"
          onMouseLeave={() => setActiveIndustry(null)}
        >
          {industries.map((industry, index) => {
            const isActive = activeIndustry === industry.id;
            const hasActive = activeIndustry !== null;
            const isInactive = hasActive && !isActive;

            return (
              <motion.article
                key={industry.id}
                onMouseEnter={() => setActiveIndustry(industry.id)}
                initial={{
                  opacity: 0,
                  y: 42,
                  rotate: industry.rotate * 1.6,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: industry.rotate,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                animate={{
                  scale: isActive ? 1.045 : isInactive ? 0.988 : 1,
                  opacity: isInactive ? 0.58 : 1,
                  rotate: isActive ? 0 : industry.rotate,
                  y: isActive ? -9 : 0,
                  filter: isInactive ? "brightness(0.82)" : "brightness(1)",
                }}
                transition={{
                  opacity: {
                    duration: 0.55,
                    delay: activeIndustry === null ? index * 0.05 : 0,
                    ease,
                  },
                  y: {
                    duration: 0.75,
                    delay: activeIndustry === null ? index * 0.05 : 0,
                    ease,
                  },
                  rotate: {
                    duration: 0.75,
                    delay: activeIndustry === null ? index * 0.05 : 0,
                    ease,
                  },
                  scale: {
                    duration: 0.7,
                    ease,
                  },
                  filter: {
                    duration: 0.55,
                    ease,
                  },
                }}
                style={{
                  ...industry.position,
                  aspectRatio: industry.aspect,
                  zIndex: isActive ? 30 : industry.zIndex,
                }}
                className="border-border bg-card absolute cursor-pointer overflow-hidden rounded-[12px] border shadow-sm"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.055 : 1,
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
                    sizes="35vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.76 : 0.56,
                  }}
                  transition={{
                    duration: 0.55,
                    ease,
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent"
                />

                <motion.div
                  initial={false}
                  animate={{
                    y: isActive ? -4 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease,
                  }}
                  className="absolute inset-x-0 bottom-0 z-10 p-5"
                >
                  <h3 className="text-[19px] leading-[1.35] font-semibold text-white">
                    {t(`items.${industry.id}`)}
                  </h3>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
