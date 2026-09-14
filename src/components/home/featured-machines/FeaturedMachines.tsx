"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const machines = [
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
] as const;

const FeaturedMachines = () => {
  const t = useTranslations("Home.FeaturedMachines");

  const [activeMachine, setActiveMachine] = useState<string | null>(null);

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-24">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-foreground text-[40px] leading-[1.2] font-semibold">
            {t("title")}
          </h2>

          <p className="text-muted-foreground mt-5 text-[16px] leading-8">
            {t("description")}
          </p>
        </div>

        <div
          className="grid grid-cols-3 gap-5"
          onMouseLeave={() => setActiveMachine(null)}
        >
          {machines.map((machine) => {
            const isActive = activeMachine === machine.id;
            const hasActive = activeMachine !== null;

            return (
              <motion.article
                key={machine.id}
                onMouseEnter={() => setActiveMachine(machine.id)}
                animate={{
                  scale: isActive ? 1.025 : hasActive ? 0.985 : 1,
                  opacity: hasActive && !isActive ? 0.72 : 1,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-border bg-card relative z-0 aspect-[4/3] overflow-hidden rounded-2xl border"
                style={{
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={machine.image}
                    alt={t(`${machine.id}.title`)}
                    fill
                    priority
                    sizes="33vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.82,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                  <motion.h3
                    animate={{
                      y: isActive ? -4 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-[23px] leading-[1.35] font-semibold text-white"
                  >
                    {t(`${machine.id}.title`)}
                  </motion.h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 14,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 max-w-md text-[15px] leading-7 text-white/80">
                      {t(`${machine.id}.description`)}
                    </p>
                  </motion.div>
                </div>

                <motion.span
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-custom-primary origin-start absolute inset-x-0 bottom-0 z-20 h-1"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines;
