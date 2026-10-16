export interface ResumeUploadResponse {
  success: boolean;
  url: string;
}

interface UploadResumePdfOptions {
  onProgress?: (progress: number) => void;
  onFinalizing?: () => void;
}

export const uploadResumePdf = (
  file: File,
  options: UploadResumePdfOptions = {},
): Promise<ResumeUploadResponse> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      "/api/resume",
    );

    xhr.upload.onprogress = (
      event,
    ) => {
      if (
        !event.lengthComputable
      ) {
        return;
      }

      const progress =
        Math.min(
          99,
          Math.round(
            (event.loaded /
              event.total) *
              100,
          ),
        );

      options.onProgress?.(
        progress,
      );
    };

    xhr.upload.onload = () => {
      options.onProgress?.(
        100,
      );

      options.onFinalizing?.();
    };

    xhr.onload = () => {
      let responseData:
        | ResumeUploadResponse
        | {
            success?: boolean;
            url?: string;
            message?: string;
          }
        | null = null;

      try {
        responseData =
          xhr.responseText
            ? JSON.parse(
                xhr.responseText,
              )
            : null;
      } catch {
        reject(
          new Error(
            "Invalid upload response.",
          ),
        );

        return;
      }

      if (
        xhr.status >= 200 &&
        xhr.status < 300 &&
        responseData?.success &&
        responseData.url
      ) {
        resolve({
          success: true,
          url: responseData.url,
        });

        return;
      }

      reject(
        new Error(
          responseData?.message ??
            "Resume upload failed.",
        ),
      );
    };

    xhr.onerror = () => {
      reject(
        new Error(
          "Resume upload failed.",
        ),
      );
    };

    xhr.onabort = () => {
      reject(
        new Error(
          "Resume upload was cancelled.",
        ),
      );
    };

    xhr.send(formData);
  });
};
