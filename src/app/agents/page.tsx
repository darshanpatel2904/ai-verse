import AgentCard from "@/components/ui/agent-card";
import { fetchAgentsByCategoryAndQuery } from "@/features/agents/actions";

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const agents = await fetchAgentsByCategoryAndQuery(undefined, q);

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
