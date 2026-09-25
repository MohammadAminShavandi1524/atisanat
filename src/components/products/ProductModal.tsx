"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { X } from "lucide-react";

import gsap from "gsap";

import type { Product, ProductLocale } from "@/data/products.data";

interface ProductModalProps {
  product: Product | null;
  locale: ProductLocale;
  onClose: () => void;
}

const ProductModal = ({ product, locale, onClose }: ProductModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeProduct, setActiveProduct] = useState<Product | null>(product);

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (!product || !activeProduct) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.03,
          ease: "power3.out",
        },
      );
    });

    return () => {
      context.revert();
    };
  }, [product, activeProduct]);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;

    const finishClose = () => {
      setActiveProduct(null);
      onClose();
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !overlay || !modal) {
      finishClose();

      return;
    }

    gsap
      .timeline({
        onComplete: finishClose,
      })
      .to(modal, {
        opacity: 0,
        y: 14,
        duration: 0.22,
        ease: "power2.in",
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
        },
        "-=0.12",
      );
  }, [onClose]);

  useEffect(() => {
    if (!activeProduct) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProduct, handleClose]);

  if (!activeProduct) {
    return null;
  }

  const title = locale === "fa" ? activeProduct.name_fa : activeProduct.name_en;

  const description =
    locale === "fa"
      ? activeProduct.description_fa
      : activeProduct.description_en;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-5 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="border-border bg-background relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border lg:grid-cols-[1fr_0.85fr]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="border-border bg-background text-muted-foreground hover:text-foreground absolute end-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-xl border transition-colors"
        >
          <X size={19} strokeWidth={1.7} />
        </button>

        {/* Image */}
        <div className="bg-secondary-bg relative min-h-[360px] lg:min-h-[560px]">
          <Image
            src={activeProduct.image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain p-6 lg:p-8"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 lg:p-10 xl:p-12">
          <h2 className="text-foreground text-2xl leading-tight font-semibold xl:text-3xl">
            {title}
          </h2>

          <p className="text-muted-foreground mt-5 text-sm leading-7 xl:text-base xl:leading-8">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
