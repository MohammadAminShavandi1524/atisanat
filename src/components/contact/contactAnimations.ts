import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateContactPage = (root: HTMLElement) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    if (reduceMotion) {
      gsap.set(
        ".contact-intro, .contact-info, .contact-form-card, .contact-form-fields",
        {
          clearProps: "all",
        },
      );

      return;
    }

    gsap.fromTo(
      ".contact-intro",
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
      ".contact-info",
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 84%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".contact-form-card",
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-card",
          start: "top 84%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".contact-form-fields",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-fields",
          start: "top 86%",
          once: true,
        },
      },
    );
  }, root);

  return () => {
    context.revert();
  };
};
