"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const equipment = [
  {
    id: "threeHalfAxis",
    image: "/home/machines/1.webp",
    orientation: "landscape",
  },
  {
    id: "threeAxis",
    image: "/home/machines/2.webp",
    orientation: "landscape",
  },
  {
    id: "fourAxis",
    image: "/home/machines/3.webp",
    orientation: "landscape",
  },
  {
    id: "manualLathe",
    image: "/home/machines/4.webp",
    orientation: "landscape",
  },
  {
    id: "surfaceGrinding",
    image: "/home/machines/5.webp",
    orientation: "portrait",
  },
  {
    id: "columnDrill",
    image: "/home/machines/6.webp",
    orientation: "portrait",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const EquipmentCapabilities2 = () => {
  const t = useTranslations("Home.EquipmentCapabilities");

  const [activeIndex, setActiveIndex] = useState(0);

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
            duration: 0.85,
            ease,
          }}
          className="grid grid-cols-[1.7fr_0.75fr] gap-5"
        >
          {/* Active Equipment */}
          <div className="border-border bg-card relative h-[640px] overflow-hidden rounded-2xl border">
            {/* Images */}
            {equipment.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 1.035,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.65,
                      ease,
                    },
                    scale: {
                      duration: 0.9,
                      ease,
                    },
                  }}
                  style={{
                    zIndex: isActive ? 2 : 1,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={t(`${item.id}.title`)}
                    fill
                    priority={index === 0}
                    sizes="70vw"
                    className={
                      item.orientation === "portrait"
                        ? "bg-card object-contain"
                        : "object-cover"
                    }
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                </motion.div>
              );
            })}

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-[170px] p-10">
              {equipment.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 16,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.5,
                        delay: isActive ? 0.12 : 0,
                        ease,
                      },
                      y: {
                        duration: 0.65,
                        ease,
                      },
                    }}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    className="absolute inset-x-10 bottom-10"
                  >
                    <h3 className="max-w-2xl text-[30px] leading-[1.3] font-semibold text-white">
                      {t(`${item.id}.title`)}
                    </h3>

                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/75">
                      {t(`${item.id}.description`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Equipment Thumbnails */}
          <div className="grid h-[640px] grid-cols-2 grid-rows-3 gap-4">
            {equipment.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.985,
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease,
                  }}
                  className="border-border relative min-h-0 min-w-0 overflow-hidden rounded-xl border text-start"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.055 : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={item.image}
                      alt={t(`${item.id}.title`)}
                      fill
                      sizes="15vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0.72 : 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                    <motion.h3
                      initial={false}
                      animate={{
                        y: isActive ? -3 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease,
                      }}
                      className="text-[15px] leading-[1.35] font-semibold text-white"
                    >
                      {t(`${item.id}.title`)}
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                    className="border-custom-primary pointer-events-none absolute inset-0 rounded-xl border-2"
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EquipmentCapabilities2;
