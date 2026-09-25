export type ProductLocale = "fa" | "en";

export interface ProductCategory {
  id: number;
  name_en: string;
  name_fa: string;
}

export interface Product {
  id: number;

  category: ProductCategory;

  name_en: string;
  name_fa: string;

  description_en: string;
  description_fa: string;

  image: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    name_en: "Part Manufacturing",
    name_fa: "قطعه‌سازی",
  },
  {
    id: 2,
    name_en: "Tool Making",
    name_fa: "ابزارسازی",
  },
];

export const products: Product[] = [
  // ---------------------------------------------------------
  // Part Manufacturing
  // ---------------------------------------------------------

  {
    id: 1,

    category: productCategories[0],

    name_en: "Precision Shaft",
    name_fa: "شفت دقیق",

    description_en:
      "Precision-machined shaft manufactured for industrial applications requiring controlled dimensions, accurate tolerances and reliable surface quality.",

    description_fa:
      "شفت ماشین‌کاری‌شده دقیق برای کاربردهای صنعتی با کنترل ابعادی، تلرانس‌های دقیق و کیفیت سطح مناسب.",

    image: "/products/part-manufacturing/1.png",
  },

  {
    id: 2,

    category: productCategories[0],

    name_en: "Industrial Flange",
    name_fa: "فلنج صنعتی",

    description_en:
      "Industrial flange manufactured through precision CNC machining for assemblies that require accurate geometry and reliable dimensional consistency.",

    description_fa:
      "فلنج صنعتی تولیدشده با ماشین‌کاری دقیق CNC برای مجموعه‌هایی که به هندسه دقیق و پایداری ابعادی نیاز دارند.",

    image: "/products/part-manufacturing/2.png",
  },

  {
    id: 3,

    category: productCategories[0],

    name_en: "Bearing Housing",
    name_fa: "هوزینگ یاتاقان",

    description_en:
      "Precision bearing housing designed and machined for stable assembly, accurate positioning and controlled fit in industrial equipment.",

    description_fa:
      "هوزینگ یاتاقان با ماشین‌کاری دقیق برای مونتاژ پایدار، موقعیت‌دهی صحیح و انطباق کنترل‌شده در تجهیزات صنعتی.",

    image: "/products/part-manufacturing/3.png",
  },

  {
    id: 4,

    category: productCategories[0],

    name_en: "Precision Bushing",
    name_fa: "بوش دقیق",

    description_en:
      "Precision bushing produced with controlled internal and external dimensions for demanding mechanical and industrial applications.",

    description_fa:
      "بوش دقیق با کنترل ابعاد داخلی و خارجی برای استفاده در مجموعه‌های مکانیکی و کاربردهای صنعتی حساس.",

    image: "/products/part-manufacturing/4.png",
  },

  {
    id: 5,

    category: productCategories[0],

    name_en: "Custom Coupling",
    name_fa: "کوپلینگ سفارشی",

    description_en:
      "Custom-machined coupling manufactured according to project dimensions and technical requirements for industrial power transmission systems.",

    description_fa:
      "کوپلینگ سفارشی تولیدشده بر اساس ابعاد و الزامات فنی پروژه برای استفاده در سیستم‌های انتقال توان صنعتی.",

    image: "/products/part-manufacturing/5.png",
  },

  // ---------------------------------------------------------
  // Tool Making
  // ---------------------------------------------------------

  {
    id: 6,

    category: productCategories[1],

    name_en: "Forming Die",
    name_fa: "قالب فرم‌دهی",

    description_en:
      "Precision forming die manufactured for repeatable industrial production with controlled geometry and accurate working surfaces.",

    description_fa:
      "قالب فرم‌دهی دقیق برای تولید صنعتی تکرارپذیر با هندسه کنترل‌شده و سطوح کاری دقیق.",

    image: "/products/tool-making/1.png",
  },

  {
    id: 7,

    category: productCategories[1],

    name_en: "Precision Jig",
    name_fa: "جیگ دقیق",

    description_en:
      "Precision jig designed to improve positioning, repeatability and process control during machining and assembly operations.",

    description_fa:
      "جیگ دقیق طراحی‌شده برای بهبود موقعیت‌دهی، تکرارپذیری و کنترل فرآیند در عملیات ماشین‌کاری و مونتاژ.",

    image: "/products/tool-making/2.png",
  },

  {
    id: 8,

    category: productCategories[1],

    name_en: "Machining Fixture",
    name_fa: "فیکسچر ماشین‌کاری",

    description_en:
      "Machining fixture engineered for stable workpiece holding, accurate positioning and repeatable CNC production.",

    description_fa:
      "فیکسچر ماشین‌کاری مهندسی‌شده برای مهار پایدار قطعه، موقعیت‌دهی دقیق و تولید تکرارپذیر در فرآیندهای CNC.",

    image: "/products/tool-making/3.png",
  },

  {
    id: 9,

    category: productCategories[1],

    name_en: "Tool Holder",
    name_fa: "هلدر ابزار",

    description_en:
      "Precision tool holder manufactured to provide stable tool positioning and reliable performance during machining operations.",

    description_fa:
      "هلدر ابزار دقیق برای ایجاد موقعیت پایدار ابزار و عملکرد مطمئن در عملیات مختلف ماشین‌کاری.",

    image: "/products/tool-making/4.png",
  },

  {
    id: 10,

    category: productCategories[1],

    name_en: "Custom Mold Insert",
    name_fa: "اینسرت قالب سفارشی",

    description_en:
      "Custom mold insert manufactured with precision machining for applications requiring accurate geometry and high dimensional consistency.",

    description_fa:
      "اینسرت قالب سفارشی تولیدشده با ماشین‌کاری دقیق برای کاربردهایی که به هندسه دقیق و پایداری ابعادی بالا نیاز دارند.",

    image: "/products/tool-making/5.png",
  },
];

export const getProductsByCategory = (categoryId: number) => {
  return products.filter((product) => product.category.id === categoryId);
};