import AgentSearchBar from "@/features/agents/components/agent-search-bar";
import { Suspense } from "react";

export default async function AgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">AI Agent Directory</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Explore our collection of specialized AI agents designed to
            streamline your workflows.
          </p>
          <Suspense>
            <AgentSearchBar />
          </Suspense>
        </div>

        {children}
      </div>
    </section>
  );
}
