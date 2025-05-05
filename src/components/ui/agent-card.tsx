import React from "react";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { AgentCategoriesType } from "@/drizzle/schema";
import Image from "next/image";

type AgentCardProps = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  category: AgentCategoriesType | null;
};
export default function AgentCard({
  id,
  name,
  description,
  imageUrl,
  rating,
  category,
}: AgentCardProps) {
  return (
    <div className="glass-card glow-effect group transition-all duration-300 h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Image
              src={imageUrl}
              alt={name}
              width={48}
              height={48}
              className="aspect-square object-cover rounded-full"
            />
          </div>
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-glow-blue uppercase tracking-wider">
            {category}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/agent/${id}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
