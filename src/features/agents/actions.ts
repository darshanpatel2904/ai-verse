import { db } from "@/drizzle/db";
import type { AgentCategoriesType } from "@/drizzle/schema";
import { and, eq, ilike } from "drizzle-orm";
import { getAgentIdTag } from "./cache";
import { unstable_cacheTag as cacheTag } from "next/cache";
export async function fetchAgentsByCategoryAndQuery(
  categorySlug?: AgentCategoriesType,
  q?: string
) {
  if (categorySlug !== undefined && q !== undefined && q !== "") {
    return await db.query.AgentTable.findMany({
      where: (agent) =>
        and(eq(agent.category, categorySlug), ilike(agent.name, `%${q}%`)),
    });
  } else if (categorySlug !== undefined) {
    return await db.query.AgentTable.findMany({
      where: (agent) => eq(agent.category, categorySlug),
    });
  } else if (q !== undefined && q !== "") {
    return await db.query.AgentTable.findMany({
      where: (agent) => ilike(agent.name, `%${q}%`),
    });
  } else {
    return await db.query.AgentTable.findMany();
  }
}

export async function fetchAgentById(agentId: string) {
  "use cache";
  cacheTag(getAgentIdTag(agentId));
  return await db.query.AgentTable.findFirst({
    where: (agents, { eq }) => eq(agents.id, agentId),
    with: {
      ratings: {
        with: {
          author: true,
        },
      },
    },
  });
}
