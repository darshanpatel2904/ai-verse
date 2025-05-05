import AgentsSection from "@/components/agent-section";
import CallToAction from "@/components/call-to-action";
import FeaturesSection from "@/components/features-section";
import HeroSection from "@/components/home-section";
import PricingSection from "@/components/Pricing-section";
import TestimonialSection from "@/components/testimonial-section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <AgentsSection />
      <TestimonialSection />
      <CallToAction />

      <section className="py-12 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Explore Our Full Catalog
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our complete collection of AI agents and tools designed
              to boost your productivity and streamline your workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-6 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4">
                AI Agents Directory
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore 20 specialized AI agents ready to assist with research,
                analysis, content creation, and more.
              </p>
              <Link
                href="/agents"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Browse all agents
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="glass-card p-6 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4">Productivity Tools</h3>
              <p className="text-muted-foreground mb-4">
                Discover 10 powerful tools to automate tasks, organize
                information, and optimize your workflow.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Browse all tools
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
