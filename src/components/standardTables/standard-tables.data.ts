export interface StandardTableChild {
  id: number;
  name_en: string;
  name_fa: string;
  size: "A3" | "A4" | "A5";
  file: string;
}

export interface StandardTableParent {
  id: number;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  cover: string;
  children: StandardTableChild[];
}

export const standardTables: StandardTableParent[] = [
  {
    id: 1,

    name_en: "Engineering Standard Tables",
    name_fa: "جداول استاندارد مهندسی",

    description_en:
      "A collection of technical standard tables prepared for engineering and manufacturing reference.",

    description_fa:
      "مجموعه‌ای از جداول استاندارد فنی برای استفاده در محاسبات مهندسی و فرآیندهای تولید.",

    cover: "/cover.jpeg",

    children: [
      {
        id: 1,
        name_en: "Engineering Standard Table - A3",
        name_fa: "جدول استاندارد مهندسی - A3",
        size: "A3",
        file: "/cover.jpeg",
      },

      {
        id: 2,
        name_en: "Engineering Standard Table - A4",
        name_fa: "جدول استاندارد مهندسی - A4",
        size: "A4",
        file: "/cover.jpeg",
      },

      {
        id: 3,
        name_en: "Engineering Standard Table - A5",
        name_fa: "جدول استاندارد مهندسی - A5",
        size: "A5",
        file: "/cover.jpeg",
      },
    ],
  },

  {
    id: 2,

    name_en: "Machining Standard Tables",
    name_fa: "جداول استاندارد ماشین‌کاری",

    description_en:
      "Technical reference tables for machining processes, dimensions and workshop calculations.",

    description_fa:
      "جداول مرجع فنی مرتبط با فرآیندهای ماشین‌کاری، ابعاد و محاسبات مورد استفاده در صنعت.",

    cover: "/cover.jpeg",

    children: [
      {
        id: 4,
        name_en: "Machining Reference Table - A4",
        name_fa: "جدول مرجع ماشین‌کاری - A4",
        size: "A4",
        file: "/cover.jpeg",
      },

      {
        id: 5,
        name_en: "Machining Reference Table - A5",
        name_fa: "جدول مرجع ماشین‌کاری - A5",
        size: "A5",
        file: "/cover.jpeg",
      },
    ],
  },
];
