import {
  getCities,
  getProvincesList,
} from "@code-plate/iran-cities";

import type { CustomSelectOption } from "@/components/ui/custom-select";

export type ResumeLocale = "fa" | "en";

export const getProvinceOptions = (
  locale: ResumeLocale,
): CustomSelectOption[] => {
  return getProvincesList().map((province) => ({
    value: province.en,
    label: locale === "fa" ? province.fa : province.en,
  }));
};

export const getCityOptions = (
  province: string,
  locale: ResumeLocale,
): CustomSelectOption[] => {
  if (!province) {
    return [];
  }

  return getCities(province).map((city) => ({
    value: city.en,
    label: locale === "fa" ? city.fa : city.en,
  }));
};