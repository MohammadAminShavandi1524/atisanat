import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateMachiningChallengesPage = (root: HTMLElement) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    if (reduceMotion) {
      gsap.set(
        ".machining-header, .machining-card, .challenge-hero-content, .challenge-hero-image, .challenge-content, .challenge-related, .challenge-footer",
        {
          clearProps: "all",
        },
      );

      return;
    }

    gsap.fromTo(
      ".machining-header",
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

    gsap.utils.toArray<HTMLElement>(".machining-card").forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    gsap.fromTo(
      ".challenge-hero-content",
      {
        opacity: 0,
        x: -28,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      ".challenge-hero-image",
      {
        opacity: 0,
        x: 28,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        delay: 0.08,
        ease: "power3.out",
      },
    );

    gsap.utils
      .toArray<HTMLElement>(".challenge-content, .challenge-related")
      .forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

    gsap.fromTo(
      ".challenge-footer",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".challenge-footer",
          start: "top 88%",
          once: true,
        },
      },
    );
  }, root);

  return () => {
    context.revert();
  };
};
