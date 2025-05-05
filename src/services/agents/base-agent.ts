import type { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { env } from "@/data/env/server";
export abstract class BaseAgent<T extends z.ZodType> {
  protected model: ChatGoogleGenerativeAI;
  protected parser: StructuredOutputParser<z.infer<T>>;
  protected outputSchema: T;
  protected chain: RunnableSequence;

  constructor(outputSchema: T) {
    this.model = new ChatGoogleGenerativeAI({
      model: env.GOOGLE_GENERATIVE_AI_MODEL,
      temperature: 0.7,
      apiKey: env.GOOGLE_API_KEY,
    });

    this.outputSchema = outputSchema;
    this.parser = this.createOutputParser();
    this.chain = this.createChain();
  }

  protected createOutputParser(): StructuredOutputParser<z.infer<T>> {
    return StructuredOutputParser.fromZodSchema(this.outputSchema);
  }

  protected abstract createChain(): RunnableSequence;
  public abstract run(input: any): Promise<z.infer<T>>;

  protected formatResponse(response: any): string {
    try {
      // Return a properly formatted JSON string
      return JSON.stringify(response, null, 2);
    } catch (error) {
      console.error("Error formatting response:", error);
      throw new Error("Failed to format response as JSON");
    }
  }

  public getJsonSchema() {
    return zodToJsonSchema(this.outputSchema);
  }
}
