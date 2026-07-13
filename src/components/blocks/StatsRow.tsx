import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  eyebrow?: string;
  heading?: string;
  stats: Stat[];
}

export function StatsRow({ eyebrow, heading, stats }: StatsRowProps) {
  return (
    <Section variant="muted">
      {heading && <SectionHeading eyebrow={eyebrow} heading={heading} />}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
