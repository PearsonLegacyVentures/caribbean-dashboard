import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

export interface CaseStudy {
  title: string;
  category: string;
  description: string;
  href: string;
}

interface CaseStudyGridProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: CaseStudy[];
}

export function CaseStudyGrid({ eyebrow, heading, description, items }: CaseStudyGridProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg"
          >
            <div className="aspect-[16/10] bg-muted" />
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">{item.category}</p>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                {item.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
