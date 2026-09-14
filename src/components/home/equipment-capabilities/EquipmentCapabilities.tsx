"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const equipment = {
  left: {
    id: "surfaceGrinding",
    image: "/home/machines/5.webp",
  },
  center: [
    {
      id: "threeHalfAxis",
      image: "/home/machines/1.webp",
    },
    {
      id: "threeAxis",
      image: "/home/machines/2.webp",
    },
    {
      id: "fourAxis",
      image: "/home/machines/3.webp",
    },
    {
      id: "manualLathe",
      image: "/home/machines/4.webp",
    },
  ],
  right: {
    id: "columnDrill",
    image: "/home/machines/6.webp",
  },
} as const;

type EquipmentCardProps = {
  id: string;
  image: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  sizes: string;
};

const EquipmentCard = ({
  id,
  image,
  activeId,
  setActiveId,
  sizes,
}: EquipmentCardProps) => {
  const t = useTranslations("Home.EquipmentCapabilities");

  const isActive = activeId === id;
  const hasActive = activeId !== null;
  const isInactive = hasActive && !isActive;

  return (
    <motion.article
      onMouseEnter={() => setActiveId(id)}
      initial={false}
      animate={{
        opacity: isInactive ? 0.72 : 1,
        scale: isActive ? 1.01 : 1,
      }}
      transition={{
        duration: 0.65,
        ease,
      }}
      className="border-border relative h-full w-full overflow-hidden rounded-2xl border"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1.055 : 1,
          filter: isInactive ? "blur(0.5px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.9,
          ease,
        }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={t(`${id}.title`)}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 0.8 : 0.5,
        }}
        transition={{
          duration: 0.6,
          ease,
        }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
      />

      {/* Title */}
      <motion.div
        initial={false}
        animate={{
          y: isActive ? -62 : 0,
        }}
        transition={{
          duration: 0.65,
          ease,
        }}
        className="absolute inset-x-6 bottom-6 z-10"
      >
        <h3 className="text-[22px] leading-[1.35] font-semibold text-white">
          {t(`${id}.title`)}
        </h3>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 18,
        }}
        transition={{
          opacity: {
            duration: isActive ? 0.5 : 0.25,
            delay: isActive ? 0.1 : 0,
            ease,
          },
          y: {
            duration: 0.65,
            ease,
          },
        }}
        className="absolute inset-x-6 bottom-6 z-10 h-[48px] overflow-hidden"
      >
        <p className="text-[14px] leading-6 text-white/80">
          {t(`${id}.description`)}
        </p>
      </motion.div>
    </motion.article>
  );
};

const EquipmentCapabilities = () => {
  const t = useTranslations("Home.EquipmentCapabilities");

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="bg-secondary-bg overflow-hidden">
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          onMouseLeave={() => setActiveId(null)}
          className="grid aspect-[17/6] grid-cols-[1.125fr_2fr_1.125fr] gap-4"
        >
          <div className="min-w-0">
            <EquipmentCard
              id={equipment.left.id}
              image={equipment.left.image}
              activeId={activeId}
              setActiveId={setActiveId}
              sizes="27vw"
            />
          </div>

          <div className="grid min-w-0 grid-cols-2 grid-rows-2 gap-4">
            {equipment.center.map((item) => (
              <div key={item.id} className="min-h-0 min-w-0">
                <EquipmentCard
                  id={item.id}
                  image={item.image}
                  activeId={activeId}
                  setActiveId={setActiveId}
                  sizes="24vw"
                />
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <EquipmentCard
              id={equipment.right.id}
              image={equipment.right.image}
              activeId={activeId}
              setActiveId={setActiveId}
              sizes="27vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EquipmentCapabilities;