"use client";

import type {
  Product,
  ProductCategory,
  ProductLocale,
} from "@/data/products.data";

import ProductCard from "./ProductCard";

interface ProductCategorySectionProps {
  category: ProductCategory;
  products: Product[];
  locale: ProductLocale;
  onOpenProduct: (product: Product) => void;
}

const ProductCategorySection = ({
  category,
  products,
  locale,
  onOpenProduct,
}: ProductCategorySectionProps) => {
  const title = locale === "fa" ? category.name_fa : category.name_en;

  const remainder = products.length % 3;

  return (
    <section>
      {/* Category Header */}
      <div className="border-foreground/70 mb-7 border-b pb-5 text-center">
        <h2 className="text-foreground text-xl font-semibold xl:text-2xl">
          {title}
        </h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-6 gap-3 xl:gap-4 2xl:gap-5">
        {products.map((product, index) => {
          const isFirstOfLastTwo =
            remainder === 2 && index === products.length - 2;

          return (
            <div
              key={product.id}
              className={`col-span-2 ${isFirstOfLastTwo ? "col-start-2" : ""}`}
            >
              <ProductCard
                product={product}
                locale={locale}
                onOpen={onOpenProduct}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCategorySection;
