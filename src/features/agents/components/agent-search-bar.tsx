"use client";

import { agentCategories } from "@/drizzle/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { agentCategoriesMapping } from "../lib/utils";

export default function AgentSearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = pathname.split("/").pop();
  const searchQuery = searchParams.get("q");
  const currentCategorySlug =
    agentCategoriesMapping[
      currentCategory as keyof typeof agentCategoriesMapping
    ];
  return (
    <>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search agents..."
          className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          value={searchQuery || ""}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set("q", e.target.value);
            } else {
              params.delete("q");
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Link
          href="/agents"
          className={cn(
            "px-4 py-1.5 rounded-full text-sm transition-colors",
            "agents" === currentCategory
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          )}
          prefetch
        >
          All
        </Link>
        {agentCategories.map((category) => (
          <Link
            key={category}
            href={`/agents/${category.toLowerCase()}`}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-colors",
              category === currentCategorySlug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            )}
            prefetch
          >
            {category}
          </Link>
        ))}
      </div>
    </>
  );
}
