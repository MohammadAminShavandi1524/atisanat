import gsap from "gsap";

export const animateProductsPage = (root: HTMLElement) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    if (reduceMotion) {
      gsap.set(
        ".products-page-header, .product-category-section, .product-card",
        {
          clearProps: "all",
        },
      );

      return;
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline.fromTo(
      ".products-page-header",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
      },
    );

    gsap.utils
      .toArray<HTMLElement>(".product-category-section")
      .forEach((section) => {
        const cards = section.querySelectorAll(".product-card");

        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 20,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
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
