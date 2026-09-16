"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Smartphone,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import FooterBottom from "./FooterBottom";

const Footer = () => {
  const locale = useLocale();

  const t = useTranslations("Footer");
  const navT = useTranslations("Header.Navigation");
  const brandT = useTranslations("Header");
  const homeT = useTranslations("Home.BrandStatement");

  const quickLinks = [
    {
      label: navT("home"),
      href: `/${locale}`,
    },
    {
      label: navT("products"),
      href: `/${locale}/products`,
    },
    {
      label: navT("machiningChallenges"),
      href: `/${locale}/machining-challenges`,
    },
    {
      label: navT("aboutUs"),
      href: `/${locale}/about-us`,
    },
    {
      label: navT("contactUs"),
      href: `/${locale}/contact-us`,
    },
    {
      label: navT("faq"),
      href: `/${locale}/faq`,
    },
  ];

  const landlines = [
    "026-34900071",
    "026-34900093",
    "026-34900182",
    "026-34900149",
  ];

  const socials = [
    {
      label: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      label: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      label: "Telegram",
      href: "#",
      icon: Send,
    },
  ];

  return (
    <footer className="border-border bg-secondary-bg border-t">
      <div className="w90">
        <div className="grid grid-cols-2 gap-24 py-14">
          {/* Brand + Quick Access */}
          <div>
            <Link
              href={`/${locale}`}
              aria-label={brandT("logoName")}
              className="inline-flex items-center gap-x-3"
            >
              <div className="relative aspect-[1520/403] w-[170px] shrink-0">
                <Image
                  src="/logo.png"
                  alt={brandT("logoName")}
                  fill
                  sizes="170px"
                  className="object-contain"
                />
              </div>

              <span className="text-foreground pt-3.25 text-[28px] leading-none font-semibold">
                {brandT("logoName")}
              </span>
            </Link>

            <p className="text-muted-foreground mt-6 text-[20px] leading-8 font-medium">
              {homeT("slogan")}
            </p>

            <div className="border-border mt-10 border-t pt-8">
              {/* <h3 className="text-foreground text-[22px] font-semibold ">
                {t("quickAccess")}
              </h3> */}

              <div className="mt-7 grid max-w-[620px] grid-cols-2 gap-x-16 gap-y-5">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-custom-primary w-fit text-[17px] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground text-[22px] font-semibold">
              {t("contact")}
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Phone
                  size={20}
                  strokeWidth={1.7}
                  className="text-custom-primary mt-1 shrink-0"
                />

                <div className="grid grid-cols-1 gap-x-10 gap-y-3">
                  {landlines.map((phone) => (
                    <Link
                      key={phone}
                      href={`tel:${phone}`}
                      dir="ltr"
                      className="text-muted-foreground hover:text-custom-primary text-[17px] transition-colors duration-300"
                    >
                      {phone}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Smartphone
                  size={20}
                  strokeWidth={1.7}
                  className="text-custom-primary shrink-0"
                />

                <Link
                  href="tel:+989125629632"
                  dir="ltr"
                  className="text-muted-foreground hover:text-custom-primary text-[17px] transition-colors duration-300"
                >
                  +98 912 562 9632
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Mail
                  size={20}
                  strokeWidth={1.7}
                  className="text-custom-primary shrink-0"
                />

                <Link
                  href="mailto:info@atisanatco.com"
                  dir="ltr"
                  className="text-muted-foreground hover:text-custom-primary text-[17px] transition-colors duration-300"
                >
                  info@atisanatco.com
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <MapPin
                  size={20}
                  strokeWidth={1.7}
                  className="text-custom-primary shrink-0"
                />

                <span className="text-muted-foreground text-[17px]">
                  {t("address")}
                </span>
              </div>
            </div>

            <div className="border-border mt-10 border-t pt-7">
              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="border-border text-muted-foreground hover:border-custom-primary hover:text-custom-primary flex size-10 items-center justify-center rounded-lg border transition-colors duration-300"
                    >
                      <Icon size={17} strokeWidth={1.7} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
