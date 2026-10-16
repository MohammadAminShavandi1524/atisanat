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
    <section className="relative border-0 bg-transparent s:rounded-2xl s:border s:border-border s:bg-background">
      <div className="border-border border-b bg-transparent px-0 py-4 s:rounded-t-2xl s:bg-secondary-bg/45 s:px-4 sm:px-6 sm:py-5 lg:px-8">
        <h2 className="text-foreground text-[17px] font-semibold s:text-lg sm:text-xl">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground mt-1.5 text-[13px] leading-6 s:text-sm">
            {description}
          </p>
        )}
      </div>

      <div className="relative px-0 py-5 s:p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </section>
  );
};

export default FormSection;
