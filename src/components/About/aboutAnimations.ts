import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateAboutPage = (root: HTMLElement) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    if (reduceMotion) {
      gsap.set(
        ".about-opening, .about-hero, .about-introduction, .about-ceo, .about-introduction-card, .about-ceo-card, .about-ceo-meta",
        {
          clearProps: "all",
        },
      );

      return;
    }

    gsap.fromTo(
      ".about-opening",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      ".about-hero",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
      },
    );

    gsap.utils
      .toArray<HTMLElement>(".about-introduction, .about-ceo")
      .forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

    gsap.utils
      .toArray<HTMLElement>(
        ".about-introduction-card, .about-ceo-card, .about-ceo-meta",
      )
      .forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
  }, root);

  return () => {
    context.revert();
  };
};
