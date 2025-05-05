import { BaseAgent } from "../base-agent";
import { RunnableSequence } from "@langchain/core/runnables";
import { ResearchAssistantPrompt } from "./research-assistant-prompt";
import {
  ResearchOutputSchema,
  type ResearchOutput,
} from "./research-assistant-output-schema";

export class ResearchAssistantAgent extends BaseAgent<
  typeof ResearchOutputSchema
> {
  constructor() {
    super(ResearchOutputSchema);
  }

  protected createChain() {
    return RunnableSequence.from([
      ResearchAssistantPrompt,
      this.model,
      this.parser,
    ]);
  }

  public async run({
    topic,
    sources,
    citationStyle,
  }: {
    topic: string;
    sources: string;
    citationStyle: string;
  }): Promise<ResearchOutput> {
    try {
      const result = await this.chain.invoke({
        topic,
        sources,
        citationStyle,
      });
      return result as ResearchOutput;
    } catch (error) {
      console.error("Error in Research Assistant Agent:", error);
      throw error;
    }
  }
}
