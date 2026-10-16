"use client";

import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ImageIcon,
  LoaderCircle,
  UploadCloud,
  X,
} from "lucide-react";

interface FormImageUploadFieldProps {
  label: string;

  value: string;

  onChange: (url: string) => void;

  error?: string;

  placeholder: string;
  uploadingLabel: string;
  removeLabel: string;
  invalidFileMessage: string;
  uploadErrorMessage: string;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const FormImageUploadField = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  uploadingLabel,
  removeLabel,
  invalidFileMessage,
  uploadErrorMessage,
}: FormImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const uploadFile = (selectedFile: File) => {
    if (
      !allowedTypes.includes(selectedFile.type) ||
      selectedFile.size > MAX_IMAGE_SIZE
    ) {
      setLocalError(invalidFileMessage);
      return;
    }

    setLocalError("");
    setFile(selectedFile);
    setProgress(0);
    setIsUploading(true);
    onChange("");

    const formData = new FormData();

    formData.append("file", selectedFile);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/resume/image");

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }

      setProgress(
        Math.min(
          100,
          Math.round((event.loaded / event.total) * 100),
        ),
      );
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText) as {
          success?: boolean;
          url?: string;
          message?: string;
        };

        if (
          xhr.status >= 200 &&
          xhr.status < 300 &&
          data.success &&
          data.url
        ) {
          setProgress(100);
          onChange(data.url);
          return;
        }

        throw new Error(data.message ?? uploadErrorMessage);
      } catch {
        setFile(undefined);
        setProgress(0);
        onChange("");
        setLocalError(uploadErrorMessage);
      } finally {
        setIsUploading(false);
      }
    };

    xhr.onerror = () => {
      setFile(undefined);
      setProgress(0);
      setIsUploading(false);
      onChange("");
      setLocalError(uploadErrorMessage);
    };

    xhr.send(formData);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];

    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(undefined);
    setProgress(0);
    setLocalError("");
    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayedError = localError || error;

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1.5">
        <label className="text-foreground text-[14px] font-medium">
          {label}
        </label>

        {displayedError && (
          <span className="text-destructive text-xs">
            {displayedError}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {!file && !value ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="border-border bg-secondary-bg/25 hover:border-custom-primary/60 hover:bg-custom-primary/[0.025] flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-7 text-center transition-colors duration-300"
        >
          <div className="border-border bg-background flex size-12 items-center justify-center rounded-xl border">
            <UploadCloud
              size={22}
              strokeWidth={1.6}
              className="text-custom-primary"
            />
          </div>

          <p className="text-foreground mt-4 text-sm font-medium">
            {placeholder}
          </p>

          <span className="text-muted-foreground mt-1.5 text-xs">
            JPG, PNG, WEBP — Max 5 MB
          </span>
        </div>
      ) : (
        <div className="border-border bg-secondary-bg/25 rounded-xl border p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <div className="border-border bg-background relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
              {previewUrl || value ? (
                <img
                  src={previewUrl || value}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImageIcon
                  size={24}
                  className="text-custom-primary"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">
                {file?.name ?? placeholder}
              </p>

              {isUploading ? (
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-muted-foreground flex items-center gap-2 text-xs">
                      <LoaderCircle
                        size={14}
                        className="animate-spin"
                      />

                      {uploadingLabel}
                    </span>

                    <span
                      dir="ltr"
                      className="text-muted-foreground text-xs"
                    >
                      {progress}%
                    </span>
                  </div>

                  <div className="bg-border h-1.5 overflow-hidden rounded-full">
                    <div
                      className="bg-custom-primary h-full transition-[width] duration-200"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-success mt-1.5 block text-xs">
                  {value ? "✓" : ""}
                </span>
              )}
            </div>

            {!isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label={removeLabel}
                className="text-muted-foreground hover:text-destructive flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormImageUploadField;