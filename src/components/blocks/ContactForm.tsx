import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  eyebrow?: string;
  heading: string;
  description?: string;
}

export function ContactForm({ eyebrow, heading, description }: ContactFormProps) {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={eyebrow} heading={heading} description={description} align="left" className="mb-8" />
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">hello@example.com</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Phone</h4>
              <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Office</h4>
              <p className="text-sm text-muted-foreground">123 Main Street, Suite 100<br />New York, NY 10001</p>
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium mb-1.5 block">First name</label>
              <Input id="firstName" placeholder="Jane" />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium mb-1.5 block">Last name</label>
              <Input id="lastName" placeholder="Smith" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</label>
            <Input id="email" type="email" placeholder="jane@example.com" />
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-medium mb-1.5 block">Company</label>
            <Input id="company" placeholder="Acme Inc." />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium mb-1.5 block">Message</label>
            <Textarea id="message" placeholder="Tell us about your project..." rows={5} />
          </div>
          <Button variant="hero" type="submit" className="w-full sm:w-auto">Send Message</Button>
        </form>
      </div>
    </Section>
  );
}
