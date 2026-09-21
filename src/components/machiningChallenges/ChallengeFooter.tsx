"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Instagram, Linkedin, Send } from "lucide-react";

import { useTranslations } from "next-intl";

interface ChallengeFooterProps {
  tags: string[];
}

const ChallengeFooter = ({ tags }: ChallengeFooterProps) => {
  const t = useTranslations("MachiningChallengesPage.article");

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20">
      <div className="bg-secondary-bg grid grid-cols-1 gap-10 rounded-2xl p-7 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 xl:p-10 2xl:gap-20">
        {/* Tags */}
        <div className="min-w-0">
          <h3 className="text-foreground text-lg font-semibold sm:text-xl">
            {t("tagsTitle")}
          </h3>

          <p className="text-muted-foreground mt-3 max-w-2xl text-justify text-sm leading-7 sm:text-[15px]">
            {t("tagsDescription")}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-border bg-background text-foreground rounded-xl border px-3.5 py-2 text-xs sm:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="min-w-0">
          <h3 className="text-foreground text-lg font-semibold sm:text-xl">
            {t("shareTitle")}
          </h3>

          <p className="text-muted-foreground mt-3 max-w-lg text-justify text-sm leading-7 sm:text-[15px]">
            {t("shareDescription")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* LinkedIn */}
            <Link
              href={
                shareUrl
                  ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl,
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="border-border bg-background text-muted-foreground hover:border-custom-primary hover:text-custom-primary flex size-11 items-center justify-center rounded-xl border transition-colors duration-300"
            >
              <Linkedin className="size-[18px]" strokeWidth={1.8} />
            </Link>

            {/* Instagram */}
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="border-border bg-background text-muted-foreground hover:border-custom-primary hover:text-custom-primary flex size-11 items-center justify-center rounded-xl border transition-colors duration-300"
            >
              <Instagram className="size-[18px]" strokeWidth={1.8} />
            </Link>

            {/* Telegram */}
            <Link
              href={
                shareUrl
                  ? `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Telegram"
              className="border-border bg-background text-muted-foreground hover:border-custom-primary hover:text-custom-primary flex size-11 items-center justify-center rounded-xl border transition-colors duration-300"
            >
              <Send className="size-[18px]" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeFooter;
