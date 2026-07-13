import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";

interface CTABlockProps {
  heading: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "muted" | "dark";
}

export function CTABlock({ heading, description, primaryCta, secondaryCta, variant = "muted" }: CTABlockProps) {
  const isDark = variant === "dark";

  return (
    <Section variant={variant}>
      <div className="text-center mx-auto max-w-2xl">
        <h2 className={`text-headline text-balance ${isDark ? "text-primary-foreground" : ""}`}>{heading}</h2>
        {description && (
          <p className={`mt-4 text-subheadline ${isDark ? "text-primary-foreground/70" : ""}`}>{description}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button variant={isDark ? "accent" : "hero"} asChild>
            <Link to={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta && (
            <Button variant={isDark ? "ghost" : "hero-outline"} asChild className={isDark ? "text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10" : ""}>
              <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
