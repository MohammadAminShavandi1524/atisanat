import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateFAQPage = (root: HTMLElement, isRTL: boolean) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const intro = root.querySelector(".faq-intro");
    const aside = root.querySelector(".faq-aside");
    const list = root.querySelector(".faq-list");
    const items = root.querySelectorAll(".faq-list-item");

    if (reduceMotion) {
      gsap.set([intro, aside, list, ...items], {
        clearProps: "all",
      });

      return;
    }

    gsap.fromTo(
      intro?.children ?? [],
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      aside?.children ?? [],
      {
        opacity: 0,
        x: isRTL ? 30 : -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aside,
          start: "top 82%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: list,
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

export const animateFAQAnswer = (
  root: HTMLElement,
  answer: HTMLDivElement,
  answerInner: HTMLDivElement,
  isOpen: boolean,
) => {
  const context = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(answer, {
        height: isOpen ? "auto" : 0,
      });

      gsap.set(answerInner, {
        opacity: isOpen ? 1 : 0,
        y: 0,
      });

      return;
    }

    const timeline = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });

    if (isOpen) {
      timeline
        .to(answer, {
          height: "auto",
          duration: 0.5,
          ease: "power3.inOut",
        })
        .fromTo(
          answerInner,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          "-=0.25",
        );
    } else {
      timeline
        .to(answerInner, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(
          answer,
          {
            height: 0,
            duration: 0.4,
            ease: "power3.inOut",
          },
          "-=0.05",
        );
    }
  }, root);

  return () => {
    context.revert();
  };
};
