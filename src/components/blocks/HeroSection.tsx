import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "centered" | "left";
}

export function HeroSection({
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
  variant = "centered",
}: HeroSectionProps) {
  const isCenter = variant === "centered";

  return (
    <section className="section-padding">
      <div className={`content-container ${isCenter ? "text-center" : ""}`}>
        <div className={`${isCenter ? "mx-auto max-w-4xl" : "max-w-3xl"}`}>
          {eyebrow && (
            <p className="text-eyebrow mb-4 animate-fade-in">{eyebrow}</p>
          )}
          <h1 className="text-display text-balance animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            {heading}
          </h1>
          <p className="mt-6 text-subheadline max-w-2xl animate-fade-in mx-auto" style={{ animationDelay: "0.2s", opacity: 0 }}>
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className={`mt-8 flex flex-wrap gap-4 animate-fade-in ${isCenter ? "justify-center" : ""}`} style={{ animationDelay: "0.3s", opacity: 0 }}>
              {primaryCta && (
                <Button variant="hero" asChild>
                  <Link to={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button variant="hero-outline" asChild>
                  <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
