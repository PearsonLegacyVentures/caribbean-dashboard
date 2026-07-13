import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/blocks/HeroSection";
import { CaseStudyGrid } from "@/components/blocks/CaseStudyGrid";
import { CTABlock } from "@/components/blocks/CTABlock";

const caseStudies = [
  { title: "Reimagining the Guest Experience", category: "Hospitality", description: "A complete digital transformation for a luxury hotel group, increasing direct bookings by 40%.", href: "#" },
  { title: "Scaling a Wellness Brand", category: "Health & Wellness", description: "Brand identity and e-commerce platform for a fast-growing wellness company entering new markets.", href: "#" },
  { title: "Modernizing Financial Services", category: "Fintech", description: "A customer-facing platform redesign that reduced support tickets by 60% and improved retention.", href: "#" },
  { title: "Launching a Destination Platform", category: "Tourism", description: "An immersive digital experience showcasing destinations, driving a 3x increase in engagement.", href: "#" },
  { title: "Revitalizing a Heritage Brand", category: "Real Estate", description: "A premium web presence and lead generation system for a 30-year-old real estate firm.", href: "#" },
  { title: "Building a Community Platform", category: "Events", description: "A full-stack event discovery and ticketing platform serving 50,000+ monthly active users.", href: "#" },
];

export default function Work() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="Our Work"
        heading="Selected projects, real results."
        description="A curated collection of work across industries. Each project represents a unique challenge met with strategic thinking and meticulous execution."
      />

      <CaseStudyGrid
        items={caseStudies}
        heading=""
        eyebrow=""
      />

      <CTABlock
        heading="Have a project in mind?"
        description="We'd love to hear about it. Let's explore how we can help."
        primaryCta={{ label: "Start a Conversation", href: "/contact" }}
        variant="muted"
      />
    </PageLayout>
  );
}
