"use client";

import { useState } from "react";

import { useLocale } from "next-intl";

import {
  getProductsByCategory,
  productCategories,
  type Product,
  type ProductLocale,
} from "@/data/products.data";

import ProductCategorySection from "./ProductCategorySection";
import ProductModal from "./ProductModal";

const ProductsPageContent = () => {
  const locale = useLocale() as ProductLocale;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-5 xl:gap-6">
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
    </>
  );
};

export default ProductsPageContent;
