import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-radial from-primary/10 to-transparent"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-glow-blue">
            Ready to Transform Your Workflow?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are saving time and boosting
            productivity with our AI-powered agents and automation tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="#"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center animate-pulse"
            >
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium flex items-center justify-center"
            >
              Schedule Demo
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
