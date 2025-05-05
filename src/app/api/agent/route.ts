import { ResearchAssistantAgent } from "@/services/agents/research-assistant/research-assistant-agent";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const researchAssistantAgentOutput = new ResearchAssistantAgent();
  const output = await researchAssistantAgentOutput.run(body);
  return NextResponse.json(output);
}
