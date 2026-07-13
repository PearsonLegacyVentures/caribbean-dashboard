import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "dark";
}

const variantStyles = {
  default: "bg-background",
  muted: "bg-muted",
  dark: "bg-primary text-primary-foreground",
};

export function Section({ children, className = "", id, variant = "default" }: SectionProps) {
  return (
    <section id={id} className={`section-padding ${variantStyles[variant]} ${className}`}>
      <div className="content-container">
        {children}
      </div>
    </section>
  );
}
