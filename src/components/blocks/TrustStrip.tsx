import { Section } from "@/components/layout/Section";

const logos = [
  "Acme Corp", "Vertex", "Pinnacle", "Horizon", "Catalyst", "Meridian"
];

interface TrustStripProps {
  label?: string;
  brands?: string[];
}

export function TrustStrip({ label = "Trusted by leading brands", brands = logos }: TrustStripProps) {
  return (
    <Section className="!py-12 md:!py-16">
      <p className="text-center text-sm font-medium text-muted-foreground mb-8">{label}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {brands.map((brand) => (
          <span key={brand} className="text-lg font-semibold text-muted-foreground/50 tracking-tight">
            {brand}
          </span>
        ))}
      </div>
    </Section>
  );
}
