import Image from "next/image";

interface ChallengeSectionProps {
  title: string;
  description: string;
  image?: string;
}

const ChallengeSection = ({
  title,
  description,
  image,
}: ChallengeSectionProps) => {
  return (
    <section className="mb-12 last:mb-0 sm:mb-14 lg:mb-16">
      <h2 className="text-foreground text-[24px] leading-[1.4] font-semibold sm:text-[27px] lg:text-[30px]">
        {title}
      </h2>

      <p className="text-muted-foreground mt-5 text-justify text-base leading-8">
        {description}
      </p>

      {image && (
        <div className="border-border relative mt-8 aspect-[16/9] overflow-hidden border">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1023px) 100vw, 70vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
};

export default ChallengeSection;
