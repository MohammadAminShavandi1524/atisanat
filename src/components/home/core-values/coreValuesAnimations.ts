import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateCoreValues = (root: HTMLElement) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const title = root.querySelector(".core-values-title");
    const cards = root.querySelectorAll(".core-value-card");

    if (reduceMotion) {
      gsap.set([title, ...cards], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      title,
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
          trigger: title,
          start: "top 84%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        delay: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
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
