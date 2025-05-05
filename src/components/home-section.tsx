import React from "react";

import { ChevronRight, Database, Bot, Code, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(17, 24, 39, 0), rgba(17, 24, 39, 1)), radial-gradient(ellipse at center, rgba(155, 135, 245, 0.15), transparent 70%)",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-xs font-medium text-primary animate-pulse">
              Now in Beta
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-glow-blue to-glow-cyan">
            AI Agents for Your Workflow Automation
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and deploy powerful AI agents that transform your
            productivity and automate complex tasks with cutting-edge artificial
            intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/agents"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
              prefetch
            >
              Explore AI Agents
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Bot size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart AI Agents</h3>
            <p className="text-sm text-muted-foreground">
              Custom AI agents tailored for specific tasks and workflows.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect your data sources and systems for seamless automation.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">API Access</h3>
            <p className="text-sm text-muted-foreground">
              Access all agents via API for custom integrations and workflows.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced AI</h3>
            <p className="text-sm text-muted-foreground">
              State-of-the-art AI models power all automation capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
