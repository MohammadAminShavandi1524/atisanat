"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { animateFeaturedMachines } from "./featuredMachinesAnimations";

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

  const rootRef = useRef<HTMLElement>(null);

  const [activeMachine, setActiveMachine] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    return animateFeaturedMachines(rootRef.current);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setActiveMachine(null);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-background overflow-hidden">
      <div className="w90 py-10 sm:py-14 lg:py-16 2xl:py-24">
        <div className="featured-machines-header mb-8 max-w-3xl sm:mb-10 lg:mb-12">
          <h2 className="text-foreground text-[30px] leading-[1.2] font-semibold sm:text-[36px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl text-justify text-sm leading-7 sm:mt-5 sm:text-[15px] sm:leading-8 lg:text-[16px]">
            {t("description")}
          </p>
        </div>

        <div
          className="flex flex-col gap-5 lg:h-[440px] lg:flex-row lg:gap-4"
          onMouseLeave={() => {
            if (isDesktop) {
              setActiveMachine(null);
            }
          }}
        >
          {machines.map((machine) => {
            const isActive = activeMachine === machine.id;
            const hasActive = activeMachine !== null;
            const isInactive = hasActive && !isActive;

            return (
              <motion.article
                key={machine.id}
                onMouseEnter={() => {
                  if (isDesktop) {
                    setActiveMachine(machine.id);
                  }
                }}
                initial={false}
                animate={{
                  flexGrow: isDesktop
                    ? isActive
                      ? 2.1
                      : hasActive
                        ? 0.45
                        : 1
                    : 0,
                  scale: isDesktop && isInactive ? 0.99 : 1,
                  opacity: isDesktop && isInactive ? 0.82 : 1,
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
                  flexBasis: isDesktop ? 0 : "auto",
                }}
                className="featured-machine-card border-border bg-card relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border lg:flex-row"
              >
                <motion.div
                  initial={false}
                  animate={{
                    filter: isDesktop && isInactive ? "blur(1px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.65,
                    ease,
                  }}
                  className="flex h-full w-full flex-col lg:flex-row"
                >
                  {/* Image */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: isDesktop ? (isActive ? "58%" : "100%") : "100%",
                    }}
                    transition={{
                      duration: 0.85,
                      ease,
                    }}
                    className="relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:aspect-auto lg:h-full"
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
                        sizes="(max-width: 1023px) 100vw, 50vw"
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

                    {/* Desktop Default Title */}
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
                      className="absolute inset-x-0 bottom-0 z-10 hidden p-6 sm:p-7 lg:block"
                    >
                      <h3 className="text-[21px] leading-[1.35] font-semibold text-white sm:text-[23px]">
                        {t(`${machine.id}.title`)}
                      </h3>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: isDesktop ? (isActive ? "42%" : "0%") : "100%",
                      opacity: isDesktop ? (isActive ? 1 : 0) : 1,
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
                    className="bg-secondary-bg relative h-auto w-full shrink-0 overflow-hidden lg:h-full"
                  >
                    <div className="flex h-full min-w-0 flex-col justify-center p-6 sm:p-8 lg:min-w-[310px]">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isDesktop ? (isActive ? 1 : 0) : 1,
                          y: isDesktop && !isActive ? 18 : 0,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: isActive ? 0.28 : 0,
                          ease,
                        }}
                      >
                        <h3 className="text-foreground text-[22px] leading-[1.4] font-semibold sm:text-[25px]">
                          {t(`${machine.id}.title`)}
                        </h3>

                        <motion.span
                          initial={false}
                          animate={{
                            scaleX: isDesktop ? (isActive ? 1 : 0) : 1,
                          }}
                          transition={{
                            duration: 0.65,
                            delay: isActive ? 0.35 : 0,
                            ease,
                          }}
                          className="bg-custom-primary origin-start mt-4 block h-1 w-14 rounded-full sm:mt-5"
                        />

                        <p className="text-muted-foreground mt-4 text-justify text-sm leading-7 sm:mt-5 sm:text-[15px] sm:leading-7.5">
                          {t(`${machine.id}.description`)}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
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
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines2;
