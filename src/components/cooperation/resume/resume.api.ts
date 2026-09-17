const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export interface CreateResumeRequest {
  full_name: string;
  email: string;
  phone_number: string;
  resume: string;
}

export async function createResume(
  data: CreateResumeRequest,
) {
  const response = await fetch(
    `${API_URL}/resume/hire/create/`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    },
  );

  const text =
    await response.text();

  let responseData = null;

  if (text) {
    try {
      responseData =
        JSON.parse(text);
    } catch {
      responseData = text;
    }
  }

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
}