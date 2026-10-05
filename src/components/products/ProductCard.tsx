"use client";

import Image from "next/image";

import type { Product, ProductLocale } from "@/data/products.data";

interface ProductCardProps {
  product: Product;
  locale: ProductLocale;
  onOpen: (product: Product) => void;
}

const ProductCard = ({ product, locale, onOpen }: ProductCardProps) => {
  const title = locale === "fa" ? product.name_fa : product.name_en;

  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="border-border bg-background hover:border-foreground/30 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border transition-colors duration-300"
      >
        {/* Title */}
        <div className="flex min-h-[72px] w-full items-center justify-center px-2 py-3 text-center sm:min-h-[82px] sm:px-3 sm:py-4 xl:min-h-[88px]">
          <h3 className="text-foreground text-sm leading-6 font-semibold sm:text-base xl:text-[17px] xl:leading-7 2xl:text-lg">
            {title}
          </h3>
        </div>

        {/* Image */}
        <div className=" relative aspect-square w-full">
          <Image
            src={product.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-contain p-2 sm:p-3 xl:p-3 2xl:p-4"
          />
        </div>
      </button>
    </article>
  );
};

export default ProductCard;
