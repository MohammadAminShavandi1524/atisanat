"use client";

import Image from "next/image";

import { Download, FileText } from "lucide-react";

import { useLocale } from "next-intl";

import { standardTables } from "./standard-tables.data";

const StandardTablesPage = () => {
  const locale = useLocale();

  const isFa = locale === "fa";

  return (
    <main className="bg-background text-foreground">
      <section className="w90 py-16 xl:py-20 2xl:py-24">
        {/* Header */}
        <div className="border-border border-b pb-8">
          <h1 className="text-foreground max-w-3xl text-3xl font-semibold tracking-tight xl:text-4xl">
            {isFa ? "جداول استاندارد" : "Standard Tables"}
          </h1>

          <p className="text-muted-foreground mt-4 max-w-2xl max-w-3xl text-sm leading-7 xl:text-base xl:leading-8">
            {isFa
              ? "مجموعه جداول و مستندات استاندارد فنی مورد استفاده در فرآیندهای مهندسی و تولید."
              : "A collection of technical standard tables and reference documents for engineering and manufacturing."}
          </p>
        </div>

        {/* Collections */}
        <div className="mt-12 flex flex-col gap-8 xl:mt-14 xl:gap-10">
          {standardTables.map((table) => (
            <article
              key={table.id}
              className="border-border bg-background grid overflow-hidden rounded-xl border lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]"
            >
              {/* Cover */}
              <div className="bg-secondary-bg border-border relative border-b p-5 lg:border-e lg:border-b-0 xl:p-6">
                <div className="mx-auto w-full max-w-[230px] lg:max-w-none">
                  <div className="border-border bg-background relative aspect-[210/297] overflow-hidden rounded-lg border">
                    <Image
                      src={table.cover}
                      alt={isFa ? table.name_fa : table.name_en}
                      fill
                      sizes="300px"
                      className="object-cover"
                      priority={table.id === 1}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-col">
                {/* Parent information */}
                <div className="border-border border-b p-6 xl:p-8">
                  <h2 className="text-foreground text-xl leading-8 font-semibold xl:text-2xl">
                    {isFa ? table.name_fa : table.name_en}
                  </h2>

                  <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-7 xl:text-[15px] xl:leading-8">
                    {isFa ? table.description_fa : table.description_en}
                  </p>
                </div>

                {/* Children */}
                <div className="flex flex-col">
                  {table.children.map((child, index) => (
                    <div
                      key={child.id}
                      className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between xl:p-6 ${
                        index !== table.children.length - 1
                          ? "border-border border-b"
                          : ""
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="border-border bg-secondary-bg flex size-11 shrink-0 items-center justify-center rounded-lg border">
                          <FileText
                            className="text-custom-primary size-5"
                            strokeWidth={1.7}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-foreground truncate text-sm font-semibold xl:text-[15px]">
                            {isFa ? child.name_fa : child.name_en}
                          </h3>

                          <span className="text-muted-foreground mt-1 block text-xs">
                            {child.size}
                          </span>
                        </div>
                      </div>

                      <a
                        href={child.file}
                        download
                        className="border-border text-foreground hover:border-custom-primary/50 hover:bg-custom-primary/5 hover:text-custom-primary flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-[background-color,border-color,color] duration-300"
                      >
                        <Download className="size-4" strokeWidth={1.8} />

                        <span>{isFa ? "دانلود" : "Download"}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default StandardTablesPage;
