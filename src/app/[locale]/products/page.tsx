import { getTranslations } from "next-intl/server";

import ProductsPageContent from "@/components/products/ProductsPageContent";

const ProductsPage = async () => {
  const t = await getTranslations("ProductsPage");

  return (
    <main className="w90">
      {/* Header */}
      <section className="pt-14 pb-14 lg:pt-16 lg:pb-16 xl:pt-20 xl:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-foreground text-3xl leading-tight font-semibold md:text-4xl xl:text-5xl">
            {t("title")}
          </h1>

          <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="pb-24 xl:pb-32">
        <ProductsPageContent />
      </section>
    </main>
  );
};

export default ProductsPage;
