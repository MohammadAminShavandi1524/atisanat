"use client";

import Link from "next/link";

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import ContactForm2 from "./ContactForm2";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactPage2 = () => {
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
      <section className="w90 py-24">
        {/* Intro */}
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
          className="mb-14 max-w-3xl"
        >
          <h1 className="text-foreground text-[52px] leading-[1.1] font-semibold">
            {t("title")}
          </h1>

          <p className="text-muted-foreground ms-1.75 mt-5 max-w-2xl text-[16px] leading-8">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-[0.78fr_1.22fr] gap-6">
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="border-border bg-secondary-bg rounded-2xl border p-10"
          >
            <h2 className="text-foreground text-[28px] font-semibold">
              {t("info.title")}
            </h2>

            <div className="mt-10">
              {/* Phone */}
              <div className="border-border border-b pb-7">
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

                <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
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

              {/* Mobile */}
              <div className="border-border border-b py-7">
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
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[17px] transition-colors duration-300"
                >
                  +98 912 562 9632
                </Link>
              </div>

              {/* Email */}
              <div className="border-border border-b py-7">
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
                  className="text-foreground hover:text-custom-primary mt-4 inline-block text-[17px] transition-colors duration-300"
                >
                  info@atisanatco.com
                </Link>
              </div>

              {/* Address */}
              <div className="pt-7">
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

                <p className="text-foreground mt-4 text-[16px] leading-8">
                  {t("info.addressValue")}
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
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
              duration: 0.8,
              delay: 0.08,
              ease,
            }}
            className="border-border rounded-2xl border p-10"
          >
            <h2 className="text-foreground text-[28px] font-semibold">
              {t("form.title")}
            </h2>

            <ContactForm2 />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage2;
