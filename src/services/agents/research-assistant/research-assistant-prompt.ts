import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ResearchOutputSchema } from "./research-assistant-output-schema";

const parser = StructuredOutputParser.fromZodSchema(ResearchOutputSchema);

export const ResearchAssistantPrompt = new PromptTemplate({
  template: `
      You are an advanced Research Assistant AI. 
      Your task is to provide well-researched information on the given topic.
      
      Research Topic: {topic}
      Preferred Sources: {sources}
      Citation Style: {citationStyle}
      
      Provide a comprehensive research output with accurate information and properly formatted citations.
      The output MUST be in valid JSON format that matches the schema defined in the function call.
      Each reference must include both the formatted citation and the source type.\n {format_instructions}
    `,
  inputVariables: ["topic", "sources", "citationStyle"],
  validateTemplate: true,
  partialVariables: {
    format_instructions: parser.getFormatInstructions(),
  },
});
