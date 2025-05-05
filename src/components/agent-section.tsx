import React from "react";

import AgentCard from "@/components/ui/agent-card";
import Link from "next/link";
import { db } from "@/drizzle/db";

export default async function AgentsSection() {
  const agentsData = await db.query.AgentTable.findMany({
    limit: 6,
  });
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Agents Gallery
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Meet our specialized AI agents designed to handle complex tasks
              and elevate your productivity.
            </p>
            <Link href="/agents" className="btn-primary" prefetch>
              View All Agents
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-grid">
          {agentsData.map((agent) => (
            <AgentCard
              key={agent.id}
              id={agent.id}
              name={agent.name}
              description={agent.description}
              imageUrl={agent.imageUrl}
              rating={agent.rating}
              category={agent.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
