import React from "react";
import {
  Star,
  ArrowLeft,
  Check,
  ListChecks,
  User,
  CircleDollarSign,
} from "lucide-react";

import Link from "next/link";
import AgentForm from "@/features/agents/components/agent-form";
import Image from "next/image";
import { fetchAgentById } from "@/features/agents/actions";
import ResearchAssistantAgentOutput from "@/features/agents/agents-output/research-assistant-agent-output";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = await fetchAgentById(agentId);
  if (!agent) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The agent you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/agents"
              className="flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Agents
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/agents"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Agents
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary">
            <Image
              src={agent.imageUrl}
              alt={agent.name}
              width={64}
              height={64}
              className="aspect-square object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{agent.name}</h1>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-primary/20 text-primary py-1 px-3 rounded-full text-sm">
                {agent.category}
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(agent.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{agent.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({agent.ratingCount} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <CircleDollarSign className="h-4 w-4 inline mr-1" />
                <span className="text-white ">{agent.creditsPerTask}</span>{" "}
                credits per execution
              </div>
            </div>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {agent.longDescription}
              </p>
            </div>

            <AgentForm agentForm={agent.formFields} />

            <ResearchAssistantAgentOutput />
          </div>

          <div className="lg:col-span-1 space-y-10">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              <ul className="space-y-4">
                {agent.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="bg-primary/20 rounded-full p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
              <ul className="space-y-4">
                {agent?.useCases?.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="bg-primary/10 rounded-full p-1">
                        <ListChecks className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-6">User Testimonials</h2>
              <div className="space-y-6">
                {agent?.ratings?.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-secondary/50 rounded-lg p-5 relative"
                  >
                    <div className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3 text-primary text-4xl opacity-50">
                      &ldquo;
                    </div>
                    <p className="italic mb-4">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
