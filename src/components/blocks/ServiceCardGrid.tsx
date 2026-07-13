import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

interface ServiceCardGridProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  services: Service[];
}

export function ServiceCardGrid({ eyebrow, heading, description, services }: ServiceCardGridProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const content = (
            <div className="group rounded-xl border border-border bg-card p-6 md:p-8 transition-all hover:border-foreground/20 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
              {service.href && (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          );

          return service.href ? (
            <Link key={service.title} to={service.href}>{content}</Link>
          ) : (
            <div key={service.title}>{content}</div>
          );
        })}
      </div>
    </Section>
  );
}
