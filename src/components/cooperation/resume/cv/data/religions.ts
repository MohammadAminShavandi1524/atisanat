import type { CustomSelectOption } from "@/components/ui/custom-select";

import type { ResumeLocale } from "./iran-locations";

interface LocalizedValue {
  value: string;
  fa: string;
  en: string;
}

interface ReligionItem extends LocalizedValue {
  mazhabs: LocalizedValue[];
}

export const religions: ReligionItem[] = [
  {
    value: "islam",
    fa: "اسلام",
    en: "Islam",
    mazhabs: [
      {
        value: "shia",
        fa: "شیعه",
        en: "Shia",
      },
      {
        value: "sunni",
        fa: "سنی",
        en: "Sunni",
      },
      {
        value: "other",
        fa: "سایر",
        en: "Other",
      },
    ],
  },
  {
    value: "christianity",
    fa: "مسیحیت",
    en: "Christianity",
    mazhabs: [
      {
        value: "armenian_apostolic",
        fa: "حواری ارمنی",
        en: "Armenian Apostolic",
      },
      {
        value: "catholic",
        fa: "کاتولیک",
        en: "Catholic",
      },
      {
        value: "protestant",
        fa: "پروتستان",
        en: "Protestant",
      },
      {
        value: "other",
        fa: "سایر",
        en: "Other",
      },
    ],
  },
  {
    value: "judaism",
    fa: "یهودیت",
    en: "Judaism",
    mazhabs: [
      {
        value: "judaism",
        fa: "یهودی",
        en: "Jewish",
      },
      {
        value: "other",
        fa: "سایر",
        en: "Other",
      },
    ],
  },
  {
    value: "zoroastrianism",
    fa: "زرتشتی",
    en: "Zoroastrianism",
    mazhabs: [
      {
        value: "zoroastrian",
        fa: "زرتشتی",
        en: "Zoroastrian",
      },
    ],
  },
  {
    value: "other",
    fa: "سایر",
    en: "Other",
    mazhabs: [
      {
        value: "other",
        fa: "سایر",
        en: "Other",
      },
    ],
  },
];

export const getReligionOptions = (
  locale: ResumeLocale,
): CustomSelectOption[] => {
  return religions.map((religion) => ({
    value: religion.value,
    label: locale === "fa" ? religion.fa : religion.en,
  }));
};

export const getMazhabOptions = (
  religionValue: string,
  locale: ResumeLocale,
): CustomSelectOption[] => {
  const religion = religions.find(
    (item) => item.value === religionValue,
  );

  if (!religion) {
    return [];
  }

  return religion.mazhabs.map((mazhab) => ({
    value: mazhab.value,
    label: locale === "fa" ? mazhab.fa : mazhab.en,
  }));
};