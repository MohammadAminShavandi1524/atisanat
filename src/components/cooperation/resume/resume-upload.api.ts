interface UploadResumeCallbacks {
  onProgress?: (progress: number) => void;

  onFinalizing?: () => void;
}

interface UploadResumeResponse {
  success: boolean;
  url: string;
}

export const uploadResumePdf = (
  file: File,
  callbacks: UploadResumeCallbacks = {},
) => {
  return new Promise<UploadResumeResponse>((resolve, reject) => {
    const formData = new FormData();

    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload/resume");

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }

      const progress = Math.round((event.loaded / event.total) * 100);

      callbacks.onProgress?.(Math.min(progress, 100));

      if (progress >= 100) {
        callbacks.onFinalizing?.();
      }
    };

    xhr.onload = () => {
      let data:
        | UploadResumeResponse
        | {
            message?: string;
          };

      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        reject(new Error("Invalid upload response"));

        return;
      }

      if (
        xhr.status >= 200 &&
        xhr.status < 300 &&
        "success" in data &&
        data.success &&
        "url" in data
      ) {
        resolve(data);

        return;
      }

      reject(data);
    };

    xhr.onerror = () => {
      reject(new Error("Resume upload failed"));
    };

    xhr.send(formData);
  });
};
