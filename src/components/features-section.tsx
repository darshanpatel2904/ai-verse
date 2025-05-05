import React from "react";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  Link,
  Lock,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for AI Automation
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform empowers you with cutting-edge AI capabilities to
            transform your workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-grid">
          {/* Feature 1 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced AI Models</h3>
            <p className="text-muted-foreground">
              Leverage state-of-the-art language models for understanding
              complex data and generating high-quality outputs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Workflow Automation</h3>
            <p className="text-muted-foreground">
              Build complex workflows with visual editors that connect multiple
              agents and tools for end-to-end automation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Link size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Seamless Integrations
            </h3>
            <p className="text-muted-foreground">
              Connect to popular tools and platforms with pre-built integrations
              and webhooks for your existing stack.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
            <p className="text-muted-foreground">
              Track performance metrics and gain insights into your automated
              workflows with detailed analytics.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Processing</h3>
            <p className="text-muted-foreground">
              Process data and trigger automations in real-time with
              high-performance infrastructure built for scale.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="glass-card p-8 hover:translate-y-[-5px] transition-all duration-300">
            <div className="feature-icon w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
            <p className="text-muted-foreground">
              Secure your data with end-to-end encryption, role-based access
              controls, and compliance with regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
