import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/blocks/HeroSection";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { StatsRow } from "@/components/blocks/StatsRow";
import { CTABlock } from "@/components/blocks/CTABlock";
import { Heart, Eye, Target, Users } from "lucide-react";

const values = [
  { icon: Eye, title: "Clarity Over Complexity", description: "We cut through noise to deliver solutions that are elegant, focused, and easy to understand." },
  { icon: Heart, title: "Craft Matters", description: "Every detail is intentional. From typography to performance, we hold ourselves to a higher standard." },
  { icon: Target, title: "Outcomes First", description: "We measure our work by the impact it creates — not the hours we log or the deliverables we produce." },
  { icon: Users, title: "True Partnership", description: "We work alongside your team, not above it. Collaboration, transparency, and trust drive everything we do." },
];

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "200+", label: "Projects delivered" },
  { value: "50+", label: "Clients worldwide" },
  { value: "98%", label: "Client satisfaction" },
];

export default function About() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="About Us"
        heading="Built on craft, driven by outcomes."
        description="We're a team of strategists, designers, and engineers who believe great digital work should be both beautiful and commercially effective."
        variant="centered"
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            Founded on the principle that digital experiences should earn attention — not demand it — we've spent the last decade helping brands across industries transform how they connect with their audiences.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            We're intentionally small, which means every client gets senior-level attention from day one. No account managers relaying messages. No junior teams learning on your project. The people you meet are the people who do the work.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Our approach blends strategic thinking with exceptional execution. We don't just make things look good — we make sure they work, perform, and deliver measurable results.
          </p>
        </div>
      </Section>

      <StatsRow stats={stats} />

      <Section>
        <SectionHeading
          eyebrow="Our Values"
          heading="Principles that guide every decision."
          description="These aren't just words on a wall. They shape how we work, who we hire, and how we show up for our clients."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeading
          eyebrow="The Team"
          heading="Senior talent, hands-on approach."
          description="A small, focused team where every member brings deep expertise and genuine care."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Alex Morgan", "Jordan Lee", "Sam Patel", "Riley Brooks"].map((name, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                {name.charAt(0)}
              </div>
              <h3 className="text-base font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {["Founder & Strategist", "Design Lead", "Engineering Lead", "Project Director"][i]}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTABlock
        heading="Want to work with us?"
        description="We're always interested in hearing about new projects and challenges."
        primaryCta={{ label: "Start a Conversation", href: "/contact" }}
      />
    </PageLayout>
  );
}
