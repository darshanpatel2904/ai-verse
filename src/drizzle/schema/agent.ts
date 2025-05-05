import {
  doublePrecision,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { RatingTable } from "./rating";

export const agentCategories = [
  "Research",
  "Business",
  "Marketing",
  "Data",
  "Education",
  "Support",
  "Media",
  "Development",
  "Productivity",
  "Automation",
  "Security",
  "Personal",
  "Other",
] as const;

export type AgentCategoriesType = (typeof agentCategories)[number];

export const agentCategoriesEnum = pgEnum("agent_category", agentCategories);

export const AgentTable = pgTable(
  "agents",
  {
    id,
    name: text().notNull(),
    description: text().notNull(),
    slug: text().notNull().unique(),
    longDescription: text().notNull(),
    imageUrl: text().notNull(),
    rating: doublePrecision().notNull().default(0),
    ratingCount: doublePrecision().notNull().default(0),
    creditsPerTask: doublePrecision().notNull().default(0),
    category: agentCategoriesEnum().default("Other"),
    features: text().array().notNull().default([]),
    useCases: text().array().notNull().default([]),
    formFields: jsonb(),
    sampleOutput: jsonb(),
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("agents_name_idx").on(table.name),
    index("agents_category_idx").on(table.category),
  ]
);

export const agentRelations = relations(AgentTable, ({ many, one }) => ({
  ratings: many(RatingTable),
  user: one(UserTable, {
    fields: [AgentTable.userId],
    references: [UserTable.id],
  }),
}));

export type AgentType = typeof AgentTable.$inferSelect;
