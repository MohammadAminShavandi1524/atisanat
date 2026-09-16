"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const values = [
  "precision",
  "infrastructure",
  "strategicIndustries",
  "noShortcuts",
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const CoreValues = () => {
  const t = useTranslations("Home.CoreValues");

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
            duration: 0.7,
            ease,
          }}
          className="text-foreground mb-10 text-[40px] leading-[1.2] font-semibold"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="grid grid-cols-4 gap-5"
        >
          {values.map((value) => (
            <motion.article
              key={value}
              variants={itemVariants}
              transition={{
                duration: 0.45,
                ease,
              }}
              className="border-border group relative min-h-[235px] overflow-hidden rounded-2xl border p-8"
            >
              <div className="bg-custom-primary/0 group-hover:bg-custom-primary/5 absolute inset-0 transition-colors duration-500 ease-out" />

              <div className="relative z-10">
                <h3 className="text-foreground group-hover:text-custom-primary text-[23px] leading-[1.4] font-semibold transition-all duration-500 ease-out">
                  {t(`${value}.title`)}
                </h3>

                <p className="text-muted-foreground mt-5 text-justify text-[15px] leading-7 transition-all duration-500 ease-out">
                  {t(`${value}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;
