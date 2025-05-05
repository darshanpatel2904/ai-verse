import AgentCard from "@/components/ui/agent-card";
import { fetchAgentsByCategoryAndQuery } from "@/features/agents/actions";
import { agentCategoriesMapping } from "@/features/agents/lib/utils";
import { notFound } from "next/navigation";

export default async function AgentCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category } = await params;
  const { q } = await searchParams;

  const categorySlug =
    agentCategoriesMapping[category as keyof typeof agentCategoriesMapping];

  const agents = await fetchAgentsByCategoryAndQuery(categorySlug, q);

  if (agents.length === 0 && !category) {
    notFound();
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-grid">
        {agents.map((agent) => (
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

      {agents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No agents found matching your criteria.
          </p>
        </div>
      )}
    </>
  );
}
