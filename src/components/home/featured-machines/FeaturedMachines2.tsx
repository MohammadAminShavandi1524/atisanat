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

const FeaturedMachines2 = () => {
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
          className="flex h-[440px] gap-4"
          onMouseLeave={() => setActiveMachine(null)}
        >
          {machines.map((machine) => {
            const isActive = activeMachine === machine.id;
            const hasActive = activeMachine !== null;
            const isInactive = hasActive && !isActive;

            return (
              <motion.article
                key={machine.id}
                onMouseEnter={() => setActiveMachine(machine.id)}
                initial={false}
                animate={{
                  flexGrow: isActive ? 2.1 : hasActive ? 0.45 : 1,
                  scale: isInactive ? 0.99 : 1,
                  opacity: isInactive ? 0.82 : 1,
                }}
                transition={{
                  flexGrow: {
                    duration: 0.85,
                    ease,
                  },
                  scale: {
                    duration: 0.7,
                    ease,
                  },
                  opacity: {
                    duration: 0.65,
                    ease,
                  },
                }}
                style={{
                  flexBasis: 0,
                }}
                className="border-border bg-card relative min-w-0 overflow-hidden rounded-2xl border"
              >
                <motion.div
                  initial={false}
                  animate={{
                    filter: isInactive ? "blur(1px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.65,
                    ease,
                  }}
                  className="flex h-full w-full"
                >
                  {/* Image */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: isActive ? "58%" : "100%",
                    }}
                    transition={{
                      duration: 0.85,
                      ease,
                    }}
                    className="relative h-full shrink-0 overflow-hidden"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.015 : 1.04,
                      }}
                      transition={{
                        duration: 1,
                        ease,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={machine.image}
                        alt={t(`${machine.id}.title`)}
                        fill
                        sizes="(max-width: 1200px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>

                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 0.18 : 0.65,
                      }}
                      transition={{
                        duration: 0.7,
                        ease,
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                    />

                    {/* Default Title */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 0 : 1,
                        y: isActive ? 12 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease,
                      }}
                      className="absolute inset-x-0 bottom-0 z-10 p-7"
                    >
                      <h3 className="text-[23px] leading-[1.35] font-semibold text-white">
                        {t(`${machine.id}.title`)}
                      </h3>
                    </motion.div>
                  </motion.div>

                  {/* Active Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: isActive ? "42%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      width: {
                        duration: 0.85,
                        ease,
                      },
                      opacity: {
                        duration: isActive ? 0.55 : 0.3,
                        delay: isActive ? 0.25 : 0,
                        ease,
                      },
                    }}
                    className="bg-secondary-bg relative h-full shrink-0 overflow-hidden"
                  >
                    <div className="flex h-full min-w-[310px] flex-col justify-center p-8">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 18,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: isActive ? 0.28 : 0,
                          ease,
                        }}
                      >
                        <h3 className="text-foreground text-[25px] leading-[1.4] font-semibold">
                          {t(`${machine.id}.title`)}
                        </h3>

                        <motion.span
                          initial={false}
                          animate={{
                            scaleX: isActive ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.65,
                            delay: isActive ? 0.35 : 0,
                            ease,
                          }}
                          className="bg-custom-primary origin-start mt-5 block h-1 w-14 rounded-full"
                        />

                        <p className="text-muted-foreground mt-5 text-justify text-[15px] leading-7.5">
                          {t(`${machine.id}.description`)}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.span
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease,
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

export default FeaturedMachines2;
