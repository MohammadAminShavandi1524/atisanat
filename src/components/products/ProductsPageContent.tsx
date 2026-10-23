"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

import {
  getProducts,
  getProductCategories,
  getProductsByCategory,
  type Product,
  type ProductLocale,
} from "./products.api";

import ProductCategorySection from "./ProductCategorySection";
import ProductModal from "./ProductModal";
import { animateProductsPage } from "./productsAnimations";

const ProductsPageContent = () => {
  const locale = useLocale() as ProductLocale;
  const rootRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const data = await getProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("GET PRODUCTS ERROR =>", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current || loading) return;

    return animateProductsPage(rootRef.current);
  }, [locale, loading]);

  const productCategories = getProductCategories(products);

  return (
    <div ref={rootRef}>
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {productCategories.map((category) => (
          <ProductCategorySection
            key={category.id}
            category={category}
            products={getProductsByCategory(products, category.id)}
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
