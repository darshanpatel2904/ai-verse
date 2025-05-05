"use client";
import { useAgentsOutputStore } from "@/providers/agents-output-store-provider";
export default function ResearchAssistantAgentOutput() {
  const { researchAssistantOutput } = useAgentsOutputStore((state) => state);
  if (!researchAssistantOutput) return null;
  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-6">Output</h2>
      <div className="bg-secondary/50 rounded-lg p-5">
        <h3 className="text-xl font-semibold mb-3">
          {researchAssistantOutput?.title}
        </h3>
        <p className="text-muted-foreground mb-6">
          {researchAssistantOutput?.summary}
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-primary mb-3">Key Sources</h4>
            <div className="space-y-4">
              {researchAssistantOutput?.references.map((reference, index) => (
                <div key={index} className="bg-background/40 rounded p-3">
                  <p className="font-medium">{reference.citation}</p>
                  <p className="text-sm">
                    Source Type: {reference.source_type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
