"use client";

import Link from "next/link";

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import ContactForm from "./ContactForm";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactPage = () => {
  const locale = useLocale();
  const t = useTranslations("Contact");

  const isRTL = locale === "fa";

  const landlines = [
    "026-34900071",
    "026-34900093",
    "026-34900182",
    "026-34900149",
  ];

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 pt-20 pb-24">
        {/* Page Intro */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="max-w-3xl"
        >
          <h1 className="text-foreground text-[48px] leading-[1.15] font-semibold">
            {t("title")}
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-[16px] leading-8">
            {t("description")}
          </p>
        </motion.div>

        <div className="border-border mt-14 grid grid-cols-[0.8fr_1.2fr] gap-20 border-t pt-14">
          {/* Contact Information */}
          <motion.aside
            initial={{
              opacity: 0,
              x: isRTL ? 30 : -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.75,
              ease,
            }}
            className="min-w-0"
          >
            <h2 className="text-foreground text-[28px] font-semibold">
              {t("info.title")}
            </h2>

            <div className="border-border mt-8 border-t">
              {/* Landlines */}
              <div className="border-border flex gap-5 border-b py-6">
                <div className="border-border text-custom-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <Phone size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <span className="text-muted-foreground text-[14px]">
                    {t("info.phone")}
                  </span>

                  <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
                    {landlines.map((phone) => (
                      <Link
                        key={phone}
                        href={`tel:${phone.replaceAll("-", "")}`}
                        dir="ltr"
                        className="text-foreground hover:text-custom-primary w-fit text-[16px] transition-colors duration-300"
                      >
                        {phone}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="border-border flex gap-5 border-b py-6">
                <div className="border-border text-custom-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <Smartphone size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <span className="text-muted-foreground text-[14px]">
                    {t("info.mobile")}
                  </span>

                  <div className="mt-2">
                    <Link
                      href="tel:+989125629632"
                      dir="ltr"
                      className="text-foreground hover:text-custom-primary text-[16px] transition-colors duration-300"
                    >
                      +98 912 562 9632
                    </Link>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="border-border flex gap-5 border-b py-6">
                <div className="border-border text-custom-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <Mail size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <span className="text-muted-foreground text-[14px]">
                    {t("info.email")}
                  </span>

                  <div className="mt-2">
                    <Link
                      href="mailto:info@atisanatco.com"
                      dir="ltr"
                      className="text-foreground hover:text-custom-primary text-[16px] transition-colors duration-300"
                    >
                      info@atisanatco.com
                    </Link>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-5 py-6">
                <div className="border-border text-custom-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <MapPin size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <span className="text-muted-foreground text-[14px]">
                    {t("info.address")}
                  </span>

                  <p className="text-foreground mt-2 text-[16px] leading-7">
                    {t("info.addressValue")}
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: isRTL ? -30 : 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease,
            }}
            className="min-w-0"
          >
            <h2 className="text-foreground text-[28px] font-semibold">
              {t("form.title")}
            </h2>

            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
