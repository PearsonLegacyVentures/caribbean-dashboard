import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ContactForm } from "@/components/blocks/ContactForm";

export default function Contact() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="Contact"
        heading="Let's start a conversation."
        description="Whether you have a project in mind or just want to explore possibilities, we'd love to hear from you."
      />

      <ContactForm
        heading="Get in touch."
        description="Fill out the form below and we'll get back to you within one business day."
      />
    </PageLayout>
  );
}
