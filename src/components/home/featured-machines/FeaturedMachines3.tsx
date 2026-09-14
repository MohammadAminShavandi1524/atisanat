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

const ease = [0.16, 1, 0.3, 1] as const;

const FeaturedMachines3 = () => {
  const t = useTranslations("Home.FeaturedMachines");

  const [activeMachine, setActiveMachine] = useState<string | null>(null);

  return (
    <section className="bg-background overflow-hidden">
      <div className="w90 py-24">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-foreground text-[40px] leading-[1.2] font-semibold">
            {t("title")}
          </h2>

          <p className="text-muted-foreground mt-5 max-w-2xl text-[16px] leading-8">
            {t("description")}
          </p>
        </div>

        <div
          className="grid grid-cols-3 gap-5 pb-[175px]"
          onMouseLeave={() => setActiveMachine(null)}
        >
          {machines.map((machine) => {
            const isActive = activeMachine === machine.id;
            const hasActive = activeMachine !== null;
            const isInactive = hasActive && !isActive;

            return (
              <div key={machine.id} className="relative">
                <motion.article
                  onMouseEnter={() => setActiveMachine(machine.id)}
                  initial={false}
                  animate={{
                    y: isActive ? -12 : 0,
                    scale: isActive ? 1.02 : isInactive ? 0.99 : 1,
                    opacity: isInactive ? 0.8 : 1,
                    filter: isInactive ? "blur(0.5px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.75,
                    ease,
                  }}
                  className="border-border bg-card relative z-10 aspect-[4/3]  overflow-hidden rounded-2xl border"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1.06 : 1,
                    }}
                    transition={{
                      duration: 0.95,
                      ease,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={machine.image}
                      alt={t(`${machine.id}.title`)}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0.38 : 0.68,
                    }}
                    transition={{
                      duration: 0.6,
                      ease,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent"
                  />

                  <motion.div
                    initial={false}
                    animate={{
                      y: isActive ? -5 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease,
                    }}
                    className="absolute inset-x-0 bottom-0 z-10 p-7"
                  >
                    <h3 className="text-[23px] leading-[1.35] font-semibold text-white">
                      {t(`${machine.id}.title`)}
                    </h3>
                  </motion.div>

                  <motion.span
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.65,
                      ease,
                    }}
                    className="bg-custom-primary origin-start absolute inset-x-0 bottom-0 z-20 h-1"
                  />
                </motion.article>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : -18,
                    scale: isActive ? 1 : 0.98,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    duration: 0.65,
                    delay: isActive ? 0.12 : 0,
                    ease,
                  }}
                  className="border-border bg-secondary-bg absolute inset-x-0 top-[calc(100%+14px)] rounded-2xl border p-7"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 10,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: isActive ? 0.2 : 0,
                      ease,
                    }}
                  >
                    <div className="mb-5 flex items-center">
                    

                      <h3 className="text-foreground text-[20px] leading-[1.4] font-semibold">
                        {t(`${machine.id}.title`)}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-justify text-[15px] leading-7">
                      {t(`${machine.id}.description`)}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines3;
