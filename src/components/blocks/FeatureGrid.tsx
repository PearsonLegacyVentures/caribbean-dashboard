import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "muted";
}

const colClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ eyebrow, heading, description, features, columns = 3, variant = "default" }: FeatureGridProps) {
  return (
    <Section variant={variant}>
      <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />
      <div className={`grid gap-8 ${colClasses[columns]}`}>
        {features.map((feature) => (
          <div key={feature.title} className="group">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
