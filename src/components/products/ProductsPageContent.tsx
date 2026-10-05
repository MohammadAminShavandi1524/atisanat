"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

import {
  getProductsByCategory,
  productCategories,
  type Product,
  type ProductLocale,
} from "@/data/products.data";

import ProductCategorySection from "./ProductCategorySection";
import ProductModal from "./ProductModal";
import { animateProductsPage } from "./productsAnimations";

const ProductsPageContent = () => {
  const locale = useLocale() as ProductLocale;
  const rootRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    return animateProductsPage(rootRef.current);
  }, [locale]);

  return (
    <div ref={rootRef}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {productCategories.map((category) => (
          <ProductCategorySection
            key={category.id}
            category={category}
            products={getProductsByCategory(category.id)}
            locale={locale}
            onOpenProduct={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        locale={locale}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductsPageContent;
