import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/blocks/HeroSection";
import { TrustStrip } from "@/components/blocks/TrustStrip";
import { ServiceCardGrid } from "@/components/blocks/ServiceCardGrid";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { CaseStudyGrid } from "@/components/blocks/CaseStudyGrid";
import { ProcessSteps } from "@/components/blocks/ProcessSteps";
import { TestimonialSection } from "@/components/blocks/TestimonialSection";
import { FAQSection } from "@/components/blocks/FAQSection";
import { CTABlock } from "@/components/blocks/CTABlock";
import { Layers, Target, Zap, Shield, BarChart3, Palette } from "lucide-react";

const services = [
  { icon: Layers, title: "Strategy & Consulting", description: "We align business objectives with clear digital strategies that drive measurable outcomes." },
  { icon: Palette, title: "Design & Experience", description: "Crafting interfaces that balance beauty with usability, rooted in user research and brand identity." },
  { icon: Zap, title: "Development & Engineering", description: "Building scalable, performant digital products with modern technologies and clean architecture." },
];

const features = [
  { icon: Target, title: "Outcome-Focused", description: "Every engagement starts with your goals. We measure success by the results that matter to your business." },
  { icon: Shield, title: "Built to Last", description: "We create systems and products designed for longevity — not quick fixes that need replacing in six months." },
  { icon: BarChart3, title: "Data-Informed", description: "Decisions backed by research, analytics, and user insights. Not guesswork, not trends — evidence." },
  { icon: Layers, title: "Full-Service", description: "Strategy, design, development, and support under one roof. No handoffs, no miscommunication." },
];

const caseStudies = [
  { title: "Reimagining the Guest Experience", category: "Hospitality", description: "A complete digital transformation for a luxury hotel group, increasing direct bookings by 40%.", href: "/work" },
  { title: "Scaling a Wellness Brand", category: "Health & Wellness", description: "Brand identity and e-commerce platform for a fast-growing wellness company entering new markets.", href: "/work" },
  { title: "Modernizing Financial Services", category: "Fintech", description: "A customer-facing platform redesign that reduced support tickets by 60% and improved retention.", href: "/work" },
  { title: "Launching a Destination Platform", category: "Tourism", description: "An immersive digital experience showcasing destinations, driving a 3x increase in engagement.", href: "/work" },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "We learn your business, audience, and goals through focused workshops and research." },
  { number: "02", title: "Strategy", description: "We define the roadmap, positioning, and success metrics before a single pixel is designed." },
  { number: "03", title: "Execution", description: "Design and development happen in tight cycles with your feedback built into every sprint." },
  { number: "04", title: "Launch & Scale", description: "We launch with confidence, then optimize based on real performance data." },
];

const testimonials = [
  { quote: "They didn't just build a website — they helped us rethink how we connect with our audience. The results speak for themselves.", author: "Sarah Chen", role: "CEO", company: "Vertex Health" },
  { quote: "The level of craft and strategic thinking exceeded our expectations. We've seen a measurable impact on every key metric.", author: "Marcus Rivera", role: "VP Marketing", company: "Pinnacle Group" },
  { quote: "Professional, responsive, and genuinely invested in our success. They feel like an extension of our team, not an outside vendor.", author: "Emily Thornton", role: "Founder", company: "Meridian Studio" },
];

const faqItems = [
  { question: "What industries do you work with?", answer: "We work across a range of industries including technology, hospitality, wellness, real estate, professional services, and more. Our approach adapts to the unique challenges of each sector." },
  { question: "How long does a typical project take?", answer: "Most projects run between 8 and 16 weeks depending on scope. We'll provide a detailed timeline during our discovery phase so you know exactly what to expect." },
  { question: "Do you offer ongoing support?", answer: "Yes. We offer retainer-based partnerships for ongoing design, development, and strategic support. Many of our clients work with us on a continuous basis." },
  { question: "What does your pricing look like?", answer: "We scope and price each project based on its unique requirements. We're transparent about costs from the start and work with a range of budgets." },
  { question: "Can you work with our existing team?", answer: "Absolutely. We frequently collaborate with in-house teams, complementing their strengths and filling gaps where needed." },
];

export default function Home() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="Strategy · Design · Results"
        heading="We build digital experiences that move businesses forward."
        description="A strategic partner for ambitious brands. We combine sharp strategy, exceptional design, and modern engineering to create digital products that perform."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/work" }}
      />

      <TrustStrip />

      <ServiceCardGrid
        eyebrow="What We Do"
        heading="End-to-end capabilities, one focused team."
        description="We bring strategy, design, and technology together to solve complex problems and create lasting value."
        services={services}
      />

      <FeatureGrid
        eyebrow="Why Us"
        heading="The difference is in the details."
        description="We're not the biggest agency, and that's by design. Here's what sets us apart."
        features={features}
        columns={4}
        variant="muted"
      />

      <CaseStudyGrid
        eyebrow="Selected Work"
        heading="Results that speak louder than case studies."
        description="A selection of recent projects across industries."
        items={caseStudies}
      />

      <ProcessSteps
        eyebrow="Our Process"
        heading="A proven approach, tailored every time."
        description="Four phases. Clear milestones. No surprises."
        steps={processSteps}
      />

      <TestimonialSection
        eyebrow="Client Feedback"
        heading="What our partners say."
        testimonials={testimonials}
      />

      <FAQSection
        eyebrow="FAQ"
        heading="Common questions, straight answers."
        items={faqItems}
      />

      <CTABlock
        heading="Ready to start something great?"
        description="Let's talk about your next project and how we can help bring it to life."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/work" }}
        variant="dark"
      />
    </PageLayout>
  );
}
