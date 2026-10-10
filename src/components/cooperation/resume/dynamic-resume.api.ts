export interface DynamicResumeQuestion {
  id: number;
  question_en: string;
  question_fa: string;
  index: number;
  created: string;
}

export interface DynamicResumeAnswer {
  question: string;
  answer: string;
}

export interface DynamicResumeAnswersPayload {
  answers: DynamicResumeAnswer[];
}

export const getDynamicResumeQuestions = async (): Promise<
  DynamicResumeQuestion[]
> => {
  const response = await fetch("/api/resume/dynamic/question/get/", {
    cache: "no-store",
  });

  const body = await response.json();

  if (!response.ok) {
    throw body;
  }

  return body as DynamicResumeQuestion[];
};

export const submitDynamicResumeAnswers = async (
  lang: "en" | "fa",
  data: DynamicResumeAnswersPayload,
) => {
  const response = await fetch(`/api/resume/dynamic/answer/create/${lang}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw body;
  }

  return body;
};
