import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  steps: Step[];
}

export function ProcessSteps({ eyebrow, heading, description, steps }: ProcessStepsProps) {
  return (
    <Section variant="muted">
      <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <span className="text-5xl font-bold text-accent/30 leading-none">{step.number}</span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
