import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getAgentsGlobalTag() {
  return getGlobalTag("users");
}

export function getAgentIdTag(id: string) {
  return getIdTag("users", id);
}

export function getAgentCategoryTag(category: string) {
  return getIdTag("users", category);
}

export function revalidateAgentCache(id: string) {
  revalidateTag(getAgentsGlobalTag());
  revalidateTag(getAgentIdTag(id));
}

export function revalidateAgentCategoryCache(category: string) {
  revalidateTag(getAgentsGlobalTag());
  revalidateTag(getAgentCategoryTag(category));
}
