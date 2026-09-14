"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const firstRow = [
  {
    id: "automotive",
    image: "/home/industries/automotive.webp",
    className: "col-span-3 h-[280px] translate-y-4",
  },
  {
    id: "power",
    image: "/home/industries/Power.webp",
    className: "col-span-2 h-[330px] -translate-y-2",
  },
  {
    id: "machinery",
    image: "/home/industries/Gearbox.webp",
    className: "col-span-4 h-[300px] translate-y-8",
  },
  {
    id: "steel",
    image: "/home/industries/steel.webp",
    className: "col-span-3 h-[285px]",
  },
] as const;

const secondRow = [
  {
    id: "mold",
    image: "/home/industries/mold.webp",
    className: "col-span-2 h-[320px]",
  },
  {
    id: "oilGas",
    image: "/home/industries/oil.webp",
    className: "col-span-4 h-[290px] translate-y-6",
  },
  {
    id: "railway",
    image: "/home/industries/Railway.webp",
    className: "col-span-3 h-[315px] -translate-y-2",
  },
  {
    id: "aerospace",
    image: "/home/industries/aerospace.webp",
    className: "col-span-3 h-[300px] translate-y-4",
  },
] as const;

type IndustryCardProps = {
  id: string;
  image: string;
  className: string;
  activeIndustry: string | null;
  setActiveIndustry: (id: string | null) => void;
  index: number;
};

const IndustryCard = ({
  id,
  image,
  className,
  activeIndustry,
  setActiveIndustry,
  index,
}: IndustryCardProps) => {
  const t = useTranslations("Home.Industries");

  const isActive = activeIndustry === id;
  const hasActive = activeIndustry !== null;
  const isInactive = hasActive && !isActive;

  return (
    <motion.article
      onMouseEnter={() => setActiveIndustry(id)}
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
        amount: 0.2,
      }}
      animate={{
        scale: isActive ? 1.045 : isInactive ? 0.99 : 1,
        opacity: isInactive ? 0.58 : 1,
        filter: isInactive ? "brightness(0.8)" : "brightness(1)",
      }}
      transition={{
        opacity: {
          duration: 0.55,
          delay: activeIndustry === null ? index * 0.055 : 0,
          ease,
        },
        y: {
          duration: 0.75,
          delay: activeIndustry === null ? index * 0.055 : 0,
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
        zIndex: isActive ? 20 : 1,
      }}
      className={[
        className,
        "border-border bg-card relative min-w-0 cursor-pointer overflow-hidden rounded-[12px] border shadow-sm",
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
          src={image}
          alt={t(`items.${id}`)}
          fill
          sizes="35vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 0.78 : 0.56,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent"
      />

      <motion.div
        initial={false}
        animate={{
          y: isActive ? -6 : 0,
        }}
        transition={{
          duration: 0.6,
          ease,
        }}
        className="absolute inset-x-0 bottom-0 z-10 p-5"
      >
        <h3 className="text-[19px] leading-[1.35] font-semibold text-white">
          {t(`items.${id}`)}
        </h3>
      </motion.div>

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
};

const Industries3 = () => {
  const t = useTranslations("Home.Industries");

  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

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
          className="text-foreground mb-14 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <div onMouseLeave={() => setActiveIndustry(null)} className="relative">
          {/* First Row */}
          <div className="grid grid-cols-12 items-start gap-4">
            {firstRow.map((industry, index) => (
              <IndustryCard
                key={industry.id}
                id={industry.id}
                image={industry.image}
                className={industry.className}
                activeIndustry={activeIndustry}
                setActiveIndustry={setActiveIndustry}
                index={index}
              />
            ))}
          </div>

          {/* Second Row */}
          <div className="mt-14 grid grid-cols-12 items-start gap-4 px-[3%]">
            {secondRow.map((industry, index) => (
              <IndustryCard
                key={industry.id}
                id={industry.id}
                image={industry.image}
                className={industry.className}
                activeIndustry={activeIndustry}
                setActiveIndustry={setActiveIndustry}
                index={index + firstRow.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries3;
