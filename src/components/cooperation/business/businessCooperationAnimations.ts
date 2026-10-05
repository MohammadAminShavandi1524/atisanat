import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateBusinessCooperationPage = (root: HTMLElement) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    const panel = root.querySelector(".business-cooperation-panel");
    const intro = root.querySelector(".business-cooperation-intro");
    const form = root.querySelector(".business-cooperation-form");
    const features = root.querySelectorAll(".business-cooperation-feature");

    if (reduceMotion) {
      gsap.set([panel, intro, form, ...features], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      panel,
      {
        opacity: 0,
        y: 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      intro,
      {
        opacity: 0,
        x: -24,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        delay: 0.12,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      form,
      {
        opacity: 0,
        x: 24,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        delay: 0.18,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      features,
      {
        opacity: 0,
        y: 18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 82%",
          once: true,
        },
      },
    );
  }, root);

  return () => {
    context.revert();
  };
};
