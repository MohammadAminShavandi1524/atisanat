"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { animateEquipmentCapabilities } from "./equipmentCapabilitiesAnimations";

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

const mobileEquipment = [
  {
    id: equipment.left.id,
    image: equipment.left.image,
    orientation: "portrait",
  },
  ...equipment.center.map((item) => ({
    ...item,
    orientation: "landscape",
  })),
  {
    id: equipment.right.id,
    image: equipment.right.image,
    orientation: "portrait",
  },
] as const;

type EquipmentCardProps = {
  id: string;
  image: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  sizes: string;
  isDesktop: boolean;
};

const EquipmentCard = ({
  id,
  image,
  activeId,
  setActiveId,
  sizes,
  isDesktop,
}: EquipmentCardProps) => {
  const t = useTranslations("Home.EquipmentCapabilities");

  const isActive = activeId === id;
  const hasActive = activeId !== null;
  const isInactive = hasActive && !isActive;

  return (
    <motion.article
      onMouseEnter={() => {
        if (isDesktop) {
          setActiveId(id);
        }
      }}
      initial={false}
      animate={{
        opacity: isDesktop && isInactive ? 0.72 : 1,
        scale: isDesktop && isActive ? 1.01 : 1,
      }}
      transition={{
        duration: 0.65,
        ease,
      }}
      className="equipment-card border-border relative h-full w-full overflow-hidden rounded-2xl border"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDesktop && isActive ? 1.055 : 1,
          filter: isDesktop && isInactive ? "blur(0.5px)" : "blur(0px)",
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
          opacity: isDesktop ? (isActive ? 0.8 : 0.5) : 0.64,
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
          y: isDesktop && isActive ? -62 : 0,
        }}
        transition={{
          duration: 0.65,
          ease,
        }}
        className="absolute inset-x-5 bottom-[72px] z-10 sm:inset-x-6 lg:bottom-6"
      >
        <h3 className="text-[19px] leading-[1.35] font-semibold text-white sm:text-[22px]">
          {t(`${id}.title`)}
        </h3>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDesktop ? (isActive ? 1 : 0) : 1,
          y: isDesktop && isActive ? 0 : 18,
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
        className="absolute inset-x-5 bottom-5 z-10 min-h-[60px] overflow-hidden sm:inset-x-6 lg:h-[48px]"
      >
        <p className="line-clamp-3 text-[13px] leading-6 text-white/80 sm:text-[14px]">
          {t(`${id}.description`)}
        </p>
      </motion.div>

      <motion.span
        initial={false}
        animate={{
          scaleX: isDesktop ? (isActive ? 1 : 0) : 1,
        }}
        transition={{
          duration: 0.75,
          ease,
        }}
        className="bg-custom-primary origin-start absolute inset-x-0 bottom-0 z-20 h-1"
      />
    </motion.article>
  );
};

const EquipmentCapabilities = () => {
  const t = useTranslations("Home.EquipmentCapabilities");

  const rootRef = useRef<HTMLElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    return animateEquipmentCapabilities(rootRef.current);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setActiveId(null);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-secondary-bg overflow-hidden">
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-24">
        <h2 className="equipment-title text-foreground mb-8 text-[30px] leading-[1.2] font-semibold sm:mb-10 sm:text-[36px] lg:mb-12 lg:text-[40px]">
          {t("title")}
        </h2>

        {/* Mobile / Tablet */}
        <div className="equipment-grid grid grid-cols-1 gap-4 lg:hidden">
          {mobileEquipment.map((item) => (
            <div
              key={item.id}
              className={
                item.orientation === "portrait"
                  ? "aspect-[3/4] min-w-0"
                  : "aspect-[4/3] min-w-0"
              }
            >
              <EquipmentCard
                id={item.id}
                image={item.image}
                activeId={activeId}
                setActiveId={setActiveId}
                sizes="100vw"
                isDesktop={false}
              />
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div
          onMouseLeave={() => setActiveId(null)}
          className="equipment-grid hidden aspect-[17/6] grid-cols-[1.125fr_2fr_1.125fr] gap-4 lg:grid"
        >
          <div className="min-w-0">
            <EquipmentCard
              id={equipment.left.id}
              image={equipment.left.image}
              activeId={activeId}
              setActiveId={setActiveId}
              sizes="27vw"
              isDesktop={isDesktop}
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
                  isDesktop={isDesktop}
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
              isDesktop={isDesktop}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentCapabilities;
