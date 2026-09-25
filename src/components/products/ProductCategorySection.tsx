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

  return (
    <section>
      {/* Category Header */}
      <div className="border-foreground/70 mb-7 border-b pb-5 text-center">
        <h2 className="text-foreground text-xl font-semibold xl:text-2xl">
          {title}
        </h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-3 gap-3 xl:gap-4 2xl:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            onOpen={onOpenProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCategorySection;
