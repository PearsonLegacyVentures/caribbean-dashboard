import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialSectionProps {
  eyebrow?: string;
  heading: string;
  testimonials: Testimonial[];
}

export function TestimonialSection({ eyebrow, heading, testimonials }: TestimonialSectionProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} heading={heading} />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="rounded-xl border border-border bg-card p-6 md:p-8">
            <p className="text-base leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                {t.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
