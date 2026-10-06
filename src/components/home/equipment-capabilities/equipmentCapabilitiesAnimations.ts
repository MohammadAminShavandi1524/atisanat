import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateEquipmentCapabilities = (root: HTMLElement) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const title = root.querySelector(".equipment-title");
    const grid = root.querySelector(".equipment-grid");
    const cards = root.querySelectorAll(".equipment-card");

    if (reduceMotion) {
      gsap.set([title, grid, ...cards], {
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
        duration: 0.75,
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
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 84%",
          once: true,
        },
      },
    );
  }, root);

  return () => {
    context.revert();
  };
};
