"use client";

import { type ChangeEvent, type DragEvent, useRef } from "react";

import { FileText, UploadCloud, X } from "lucide-react";

import { useTranslations } from "next-intl";

interface BusinessResumeUploadFieldProps {
  value?: File;

  onChange: (file?: File) => void;

  error?: string;

  progress: number;

  isUploading: boolean;

  isFinalizing: boolean;
}

const BusinessResumeUploadField = ({
  value,
  onChange,
  error,
  progress,
  isUploading,
  isFinalizing,
}: BusinessResumeUploadFieldProps) => {
  const t = useTranslations("BusinessCooperation");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) {
      return;
    }

    onChange(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const showProgress = isUploading && (progress > 0 || isFinalizing);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center justify-between gap-3">
        <label className="text-foreground text-[18px] font-semibold">
          {t("form.resume.label")}
        </label>

        {error && <span className="text-destructive text-xs">{error}</span>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleInputChange}
        className="hidden"
      />

      {!value ? (
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
          className="border-border bg-background hover:border-custom-primary/60 flex min-h-[300px] flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-8 py-8 text-center transition-colors duration-300"
        >
          <div className="border-border bg-secondary-bg flex size-14 items-center justify-center rounded-xl border">
            <UploadCloud
              size={24}
              strokeWidth={1.6}
              className="text-custom-primary"
            />
          </div>

          <p className="text-foreground mt-5 max-w-[260px] text-[14px] leading-6 font-medium">
            {t("form.resume.placeholder")}
          </p>

          <span className="text-muted-foreground mt-2 text-xs">PDF</span>
        </div>
      ) : (
        <div className="border-border bg-background rounded-xl border p-5">
          <div>
            <div className="flex items-center gap-4">
              <div className="border-border bg-secondary-bg flex size-12 shrink-0 items-center justify-center rounded-xl border">
                <FileText
                  size={21}
                  strokeWidth={1.6}
                  className="text-custom-primary"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-[14px] font-medium">
                  {value.name}
                </p>

                <span className="text-muted-foreground mt-1.5 block text-xs">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              {!isUploading && (
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label={t("form.resume.remove")}
                  className="text-muted-foreground hover:text-destructive flex size-8 cursor-pointer items-center justify-center transition-colors duration-300"
                >
                  <X size={18} strokeWidth={1.7} />
                </button>
              )}
            </div>
          </div>

          {showProgress && (
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-xs">
                  {isFinalizing
                    ? t("form.resume.finalizing")
                    : t("form.resume.uploading")}
                </span>

                <span dir="ltr" className="text-muted-foreground text-xs">
                  {progress}%
                </span>
              </div>

              <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className="bg-custom-primary h-full transition-[width] duration-200"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessResumeUploadField;
