import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateFeaturedMachines = (root: HTMLElement) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = root.querySelector(".featured-machines-header");
    const cards = root.querySelectorAll(".featured-machine-card");

    if (reduceMotion) {
      gsap.set([header, ...cards], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      header,
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
          trigger: header,
          start: "top 84%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
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
