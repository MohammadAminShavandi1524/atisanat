export interface FAQ {
  id: number;
  question_en: string;
  question_fa: string;
  answer_en: string;
  answer_fa: string;
  index: number;
  created: string;
}

export async function getFAQs(signal?: AbortSignal): Promise<FAQ[]> {
  const response = await fetch("/api/faq/get", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const data: FAQ[] = await response.json();

  return data.sort((a, b) => a.index - b.index);
}
