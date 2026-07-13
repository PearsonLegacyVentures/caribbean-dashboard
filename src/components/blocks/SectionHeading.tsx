interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, heading, description, align = "center", className = "" }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} mb-12 md:mb-16 ${className}`}>
      {eyebrow && <p className="text-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-headline text-balance">{heading}</h2>
      {description && (
        <p className="mt-4 text-subheadline">{description}</p>
      )}
    </div>
  );
}
