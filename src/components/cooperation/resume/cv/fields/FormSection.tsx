import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => {
  return (
    <section className="border-border bg-background overflow-hidden rounded-2xl border">
      <div className="border-border bg-secondary-bg/45 border-b px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <h2 className="text-foreground text-lg font-semibold sm:text-xl">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground mt-1.5 text-sm leading-6">
            {description}
          </p>
        )}
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </section>
  );
};

export default FormSection;