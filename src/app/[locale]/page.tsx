import BrandStatement from "@/components/home/brand-statement/BrandStatement";
import CoreValues from "@/components/home/core-values/CoreValues";
import EquipmentCapabilities from "@/components/home/equipment-capabilities/EquipmentCapabilities";
import FeaturedMachines2 from "@/components/home/featured-machines/FeaturedMachines2";
import Hero from "@/components/home/hero/Hero";
import Industries2 from "@/components/home/industries/Industries2";
import MachiningChallenges from "@/components/home/machining-challenges/MachiningChallenges";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <BrandStatement />
      <FeaturedMachines2 />
      <CoreValues />
      <EquipmentCapabilities />
      <MachiningChallenges />
      <Industries2 />
    </>
  );
}
