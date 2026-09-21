import BrandStatement2 from "@/components/home/brand-statement-2/BrandStatement2";
import BrandStatement from "@/components/home/brand-statement/BrandStatement";
import CoreValues from "@/components/home/core-values/CoreValues";
import CoreValues2 from "@/components/home/core-values/CoreValues2";
import CoreValues3 from "@/components/home/core-values/CoreValues3";
import EquipmentCapabilities from "@/components/home/equipment-capabilities/EquipmentCapabilities";
import EquipmentCapabilities2 from "@/components/home/equipment-capabilities/EquipmentCapabilities2";
import FeaturedMachines from "@/components/home/featured-machines/FeaturedMachines";
import FeaturedMachines2 from "@/components/home/featured-machines/FeaturedMachines2";
import FeaturedMachines3 from "@/components/home/featured-machines/FeaturedMachines3";
import Hero from "@/components/home/hero/Hero";
import Industries from "@/components/home/industries/Industries";
import Industries2 from "@/components/home/industries/Industries2";
import Industries3 from "@/components/home/industries/Industries3";
import MachiningChallenges from "@/components/home/machining-challenges/MachiningChallenges";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <BrandStatement />
      {/* <BrandStatement2 /> */}
      {/* <FeaturedMachines /> */}
      <FeaturedMachines2 />
      {/* <FeaturedMachines3 /> */}
      <CoreValues />
      {/* <CoreValues2 /> */}
      {/* <CoreValues3 /> */}
      <EquipmentCapabilities />
      {/* <EquipmentCapabilities2 /> */}

      <MachiningChallenges />

      {/* <Industries /> */}
      <Industries2 />
      {/* <Industries3 /> */}
    </>
  );
}
