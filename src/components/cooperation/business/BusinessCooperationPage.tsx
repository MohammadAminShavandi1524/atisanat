"use client";

import { useEffect, useRef } from "react";

import { Handshake, ShieldCheck, UsersRound } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import BusinessCooperationForm from "./BusinessCooperationForm";
import { animateBusinessCooperationPage } from "./businessCooperationAnimations";

const BusinessCooperationPage = () => {
  const locale = useLocale();
  const t = useTranslations("BusinessCooperation");

  const rootRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!rootRef.current) return;

    return animateBusinessCooperationPage(rootRef.current);
  }, []);

  return (
    <main
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background text-foreground min-h-screen overflow-hidden"
    >
      <section className="w90 py-10 sm:py-12 lg:py-14 xl:py-18">
        <div className="business-cooperation-panel border-border grid grid-cols-1 overflow-hidden rounded-2xl border lg:grid-cols-[0.72fr_1.28fr]">
          {/* Intro */}
          <div className="business-cooperation-intro bg-secondary-bg relative p-6 sm:p-8 lg:min-h-[650px] lg:p-10 2xl:p-12">
            <div className="relative z-10">
              <h1 className="text-foreground max-w-md text-[34px] leading-[1.15] font-semibold sm:text-[40px] lg:text-[44px] 2xl:text-[50px]">
                {t("title")}
              </h1>

              <p className="text-muted-foreground mt-5 max-w-md text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8">
                {t("description")}
              </p>

              <div className="border-border mt-10 sm:mt-12 lg:mt-16">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="business-cooperation-feature border-border flex items-start gap-3 border-b py-5 last:border-b-0 sm:py-6"
                    >
                      <div className="mt-1 flex size-10 shrink-0 items-center justify-center sm:size-11">
                        <Icon
                          className="text-custom-primary size-6 sm:size-7"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-foreground text-sm font-semibold sm:text-[15px]">
                          {feature.title}
                        </h3>

                        <p className="text-muted-foreground mt-1.5 text-xs leading-6 sm:text-[13px]">
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
          <div className="business-cooperation-form border-border min-w-0 border-t p-6 sm:p-8 lg:border-s lg:border-t-0 lg:p-10 2xl:p-12">
            <BusinessCooperationForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BusinessCooperationPage;
