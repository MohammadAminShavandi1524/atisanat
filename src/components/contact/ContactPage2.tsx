"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import ContactForm2 from "./ContactForm2";
import { animateContactPage } from "./contactAnimations";

const ContactPage2 = () => {
  const locale = useLocale();
  const t = useTranslations("Contact");

  const rootRef = useRef<HTMLElement>(null);
  const isRTL = locale === "fa";

  const landlines = [
    "026-34900071",
    "026-34900093",
    "026-34900182",
    "026-34900149",
  ];

  useEffect(() => {
    if (!rootRef.current) return;

    return animateContactPage(rootRef.current);
  }, [locale]);

  return (
    <main
      ref={rootRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 py-14 sm:py-16 lg:py-24">
        {/* Intro */}
        <div className="contact-intro mb-10 max-w-3xl sm:mb-14">
          <h1 className="text-foreground text-4xl leading-[1.1] font-semibold sm:text-[46px] lg:text-[52px]">
            {t("title")}
          </h1>

          <p className="text-muted-foreground ms-0 mt-5 max-w-2xl text-sm leading-7 sm:ms-1.75 sm:text-[16px] sm:leading-8">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Contact Information */}
          <aside className="contact-info border-border bg-secondary-bg rounded-2xl border p-6 sm:p-8 lg:p-10">
            <h2 className="text-foreground text-2xl font-semibold sm:text-[28px]">
              {t("info.title")}
            </h2>

            <div className="mt-8 sm:mt-10">
              {/* Phone */}
              <div className="border-border border-b pb-6 sm:pb-7">
                <div className="flex items-center gap-3">
                  <Phone
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-[14px]">
                    {t("info.phone")}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 min-[420px]:gap-x-8">
                  {landlines.map((phone) => (
                    <Link
                      key={phone}
                      href={`tel:${phone.replaceAll("-", "")}`}
                      dir="ltr"
                      className="text-foreground hover:text-custom-primary w-fit text-[15px] transition-colors duration-300 sm:text-[16px]"
                    >
                      {phone}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="border-border border-b py-6 sm:py-7">
                <div className="flex items-center gap-3">
                  <Smartphone
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-[14px]">
                    {t("info.mobile")}
                  </span>
                </div>

                <Link
                  href="tel:+989125629632"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[16px] transition-colors duration-300 sm:text-[17px]"
                >
                  +98 912 562 9632
                </Link>
              </div>

              {/* Email */}
              <div className="border-border border-b py-6 sm:py-7">
                <div className="flex items-center gap-3">
                  <Mail
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-[14px]">
                    {t("info.email")}
                  </span>
                </div>

                <Link
                  href="mailto:info@atisanatco.com"
                  dir="ltr"
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[16px] transition-colors duration-300 sm:text-[17px]"
                >
                  info@atisanatco.com
                </Link>
              </div>

              {/* Address */}
              <div className="pt-6 sm:pt-7">
                <div className="flex items-center gap-3">
                  <MapPin
                    size={19}
                    strokeWidth={1.7}
                    className="text-custom-primary shrink-0"
                  />

                  <span className="text-muted-foreground text-[14px]">
                    {t("info.address")}
                  </span>
                </div>

                <p className="text-foreground mt-4 text-[15px] leading-8 sm:text-[16px]">
                  {t("info.addressValue")}
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="contact-form-card border-border rounded-2xl border p-6 sm:p-8 lg:p-10">
            <h2 className="text-foreground text-2xl font-semibold sm:text-[28px]">
              {t("form.title")}
            </h2>

            <ContactForm2 />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage2;
