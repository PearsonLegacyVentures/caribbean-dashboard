import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: FAQItem[];
}

export function FAQSection({ eyebrow, heading, description, items }: FAQSectionProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
