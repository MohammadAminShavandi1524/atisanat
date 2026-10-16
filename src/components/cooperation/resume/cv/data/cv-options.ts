import type { CustomSelectOption } from "@/components/ui/custom-select";

import type { ResumeLocale } from "./iran-locations";

interface LocalizedOption {
  value: string;
  fa: string;
  en: string;
}

const createLocalizedOptions = (
  items: LocalizedOption[],
  locale: ResumeLocale,
): CustomSelectOption[] =>
  items.map((item) => ({
    value: item.value,
    label: locale === "fa" ? item.fa : item.en,
  }));

const languageLevels: LocalizedOption[] = [
  {
    value: "basic",
    fa: "مقدماتی",
    en: "Basic",
  },
  {
    value: "intermediate",
    fa: "متوسط",
    en: "Intermediate",
  },
  {
    value: "advanced",
    fa: "پیشرفته",
    en: "Advanced",
  },
];

const dutyStatuses: LocalizedOption[] = [
  {
    value: "served",
    fa: "پایان خدمت",
    en: "Completed Service",
  },
  {
    value: "not_served",
    fa: "مشمول",
    en: "Not Completed",
  },
  {
    value: "exempt",
    fa: "معاف",
    en: "Exempt",
  },
];

const dependentRelations: LocalizedOption[] = [
  {
    value: "child",
    fa: "فرزند",
    en: "Child",
  },
  {
    value: "spouse",
    fa: "همسر",
    en: "Spouse",
  },
  {
    value: "father",
    fa: "پدر",
    en: "Father",
  },
  {
    value: "mother",
    fa: "مادر",
    en: "Mother",
  },
  {
    value: "sibling",
    fa: "خواهر / برادر",
    en: "Sibling",
  },
  {
    value: "other",
    fa: "سایر",
    en: "Other",
  },
];

export const getLanguageLevelOptions = (
  locale: ResumeLocale,
): CustomSelectOption[] => createLocalizedOptions(languageLevels, locale);

export const getDutyStatusOptions = (
  locale: ResumeLocale,
): CustomSelectOption[] => createLocalizedOptions(dutyStatuses, locale);

export const getDependentRelationOptions = (
  locale: ResumeLocale,
): CustomSelectOption[] => createLocalizedOptions(dependentRelations, locale);
