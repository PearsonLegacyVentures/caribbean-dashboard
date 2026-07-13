import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ServiceCardGrid } from "@/components/blocks/ServiceCardGrid";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { CTABlock } from "@/components/blocks/CTABlock";
import { Layers, Palette, Zap, BarChart3, Globe, Megaphone } from "lucide-react";
import { Check } from "lucide-react";

const services = [
  { icon: Layers, title: "Strategy & Research", description: "Market analysis, competitive audits, user research, and strategic roadmaps that set the foundation for everything we build." },
  { icon: Palette, title: "Brand & Identity", description: "Visual identity systems, brand guidelines, and messaging frameworks that position your business for growth." },
  { icon: Zap, title: "Web Design & Development", description: "Custom websites and web applications built with modern technologies, optimized for performance and conversion." },
  { icon: BarChart3, title: "Analytics & Optimization", description: "Data-driven insights, A/B testing, and continuous optimization to improve performance over time." },
  { icon: Globe, title: "Digital Transformation", description: "End-to-end digital strategy and implementation for organizations ready to modernize their operations." },
  { icon: Megaphone, title: "Content & Marketing", description: "Content strategy, copywriting, and marketing support that connects your brand with the right audience." },
];

const comparisonFeatures = [
  "Dedicated senior team",
  "Strategic discovery phase",
  "Custom design (no templates)",
  "Performance optimization",
  "Ongoing support & iteration",
  "Transparent pricing",
];

export default function Services() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="Services"
        heading="Everything you need, nothing you don't."
        description="We offer a focused set of services designed to help ambitious brands grow through better digital experiences."
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />

      <ServiceCardGrid
        eyebrow="Capabilities"
        heading="Services built around your goals."
        description="Each engagement is tailored to your specific needs. Here's what we bring to the table."
        services={services}
      />

      <Section variant="muted">
        <SectionHeading
          eyebrow="The Difference"
          heading="Why clients choose us."
          description="Working with us means working with a team that's invested in your success — not just your project."
        />
        <div className="mx-auto max-w-2xl">
          <div className="space-y-4">
            {comparisonFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-lg bg-card border border-border p-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABlock
        heading="Let's build something remarkable."
        description="Every great project starts with a conversation. Tell us about yours."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/work" }}
        variant="dark"
      />
    </PageLayout>
  );
}
