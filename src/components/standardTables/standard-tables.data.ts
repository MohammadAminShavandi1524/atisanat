export interface StandardTableChild {
  id: number;
  name_en: string;
  name_fa: string;
  size: string;
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

interface ChartParentResponse {
  id: number;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  image: string;
  created: string;
}

interface ChartChildResponse {
  id: number;
  chart: ChartParentResponse;
  name_en: string;
  name_fa: string;
  size: string;
  file: string;
  created: string;
}

export async function getStandardTables(
  signal?: AbortSignal,
): Promise<StandardTableParent[]> {
  const parentRes = await fetch("/api/chart/parent/get", {
    signal,
  });

  if (!parentRes.ok) {
    throw new Error("Failed to fetch standard table parents");
  }

  const parents: ChartParentResponse[] = await parentRes.json();

  if (!Array.isArray(parents)) {
    throw new Error("Invalid standard table parents response");
  }

  const tables = await Promise.all(
    parents.map(async (parent) => {
      const childRes = await fetch(
        `/api/chart/child/get_by_parent/${parent.id}`,
        {
          signal,
        },
      );

      if (!childRes.ok) {
        throw new Error(
          `Failed to fetch standard table children for parent ${parent.id}`,
        );
      }

      const children: ChartChildResponse[] = await childRes.json();

      if (!Array.isArray(children)) {
        throw new Error(
          `Invalid standard table children response for parent ${parent.id}`,
        );
      }

      return {
        id: parent.id,
        name_en: parent.name_en,
        name_fa: parent.name_fa,
        description_en: parent.description_en,
        description_fa: parent.description_fa,
        cover: parent.image,
        children: children.map((child) => ({
          id: child.id,
          name_en: child.name_en,
          name_fa: child.name_fa,
          size: child.size,
          file: child.file,
        })),
      };
    }),
  );

  return tables;
}
