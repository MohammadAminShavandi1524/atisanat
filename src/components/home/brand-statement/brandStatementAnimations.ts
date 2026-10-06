import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateBrandStatement = (root: HTMLElement, isRTL: boolean) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const slogan = root.querySelector(".brand-slogan");
    const words = root.querySelectorAll(".brand-slogan-word");
    const content = root.querySelector(".brand-content");
    const line = root.querySelector(".brand-line");

    if (reduceMotion) {
      gsap.set([slogan, ...words, content, line], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      slogan,
      {
        opacity: 0,
        x: isRTL ? 35 : -35,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slogan,
          start: "top 82%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slogan,
          start: "top 82%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      content,
      {
        opacity: 0,
        x: isRTL ? -35 : 35,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 82%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      line,
      {
        scaleX: 0,
        transformOrigin: isRTL ? "right center" : "left center",
      },
      {
        scaleX: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
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
