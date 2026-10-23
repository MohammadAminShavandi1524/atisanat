export type ProductLocale = "fa" | "en";

export interface ProductCategory {
  id: number;
  name_en: string;
  name_fa: string;
  created: string;
}

export interface Product {
  id: number;
  category: ProductCategory;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  image: string;
  created: string;
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch("/api/products/get", {
    signal,
  });

  const data: unknown = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response");
  }

  return data as Product[];
}

export function getProductCategories(products: Product[]): ProductCategory[] {
  const categories = new Map<number, ProductCategory>();

  for (const product of products) {
    if (!categories.has(product.category.id)) {
      categories.set(product.category.id, product.category);
    }
  }

  return Array.from(categories.values()).sort((a, b) => a.id - b.id);
}

export function getProductsByCategory(
  products: Product[],
  categoryId: number,
): Product[] {
  return products.filter((product) => product.category.id === categoryId);
}
