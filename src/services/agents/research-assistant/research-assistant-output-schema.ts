import { z } from "zod";

export const ResearchOutputSchema = z.object({
  title: z.string().describe("The title of the research"),
  summary: z
    .string()
    .describe("A comprehensive summary of the research findings"),
  references: z
    .array(
      z.object({
        citation: z
          .string()
          .describe("The formatted citation according to the specified style"),
        source_type: z
          .string()
          .describe("Type of source (e.g., journal, book, website)"),
      })
    )
    .describe(
      "List of references formatted according to the specified citation style"
    ),
});

export type ResearchOutput = z.infer<typeof ResearchOutputSchema>;
