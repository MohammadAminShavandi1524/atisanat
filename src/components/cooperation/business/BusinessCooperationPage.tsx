"use client";

import { motion } from "framer-motion";

import { Handshake, ShieldCheck, UsersRound } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import BusinessCooperationForm from "./BusinessCooperationForm";

const ease = [0.16, 1, 0.3, 1] as const;

const BusinessCooperationPage = () => {
  const locale = useLocale();
  const t = useTranslations("BusinessCooperation");

  const isRTL = locale === "fa";

  const features = [
    {
      icon: ShieldCheck,
      title: t("features.fast.title"),
      description: t("features.fast.description"),
    },
    {
      icon: UsersRound,
      title: t("features.partners.title"),
      description: t("features.partners.description"),
    },
    {
      icon: Handshake,
      title: t("features.growth.title"),
      description: t("features.growth.description"),
    },
  ];

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="border-border grid grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-2xl border"
        >
          {/* Intro */}
          <div className="bg-secondary-bg relative min-h-[650px] p-12">
            <div className="relative z-10">
              <h1 className="text-foreground max-w-md text-[50px] leading-[1.1] font-semibold">
                {t("title")}
              </h1>

              <p className="text-muted-foreground mt-6 max-w-md text-[16px] leading-8">
                {t("description")}
              </p>

              {/* Features */}
              <div className="border-border mt-16">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="border-border flex items-start gap-3 border-b py-6 last:border-b-0"
                    >
                      <div className="flex size-11 shrink-0 mt-1 justify-center rounded-xl">
                        <Icon
                          className="text-custom-primary size-7"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-foreground text-[15px] font-semibold">
                          {feature.title}
                        </h3>

                        <p className="text-muted-foreground mt-1.5 text-[13px] leading-6">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-custom-primary/8 pointer-events-none absolute -start-24 -bottom-24 size-[320px] rounded-full blur-[110px]" />
          </div>

          {/* Form */}
          <div className="border-border min-w-0 border-s p-12">
            <BusinessCooperationForm />
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default BusinessCooperationPage;
