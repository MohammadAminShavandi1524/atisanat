import type { CreateCVResumeRequest } from "./cv-resume.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createCVResume(
  data: CreateCVResumeRequest,
) {
  const response = await fetch(
    `${API_URL}/resume/cv/create/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );

  const text = await response.text();

  let responseData: unknown = null;

  if (text) {
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = text;
    }
  }

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
}