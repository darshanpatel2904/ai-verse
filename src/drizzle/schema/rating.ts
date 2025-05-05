import {
  doublePrecision,
  index,
  pgTable,
  text,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { AgentTable } from "./agent";
import { relations } from "drizzle-orm";

export const RatingTable = pgTable(
  "ratings",
  {
    id,
    quote: text().notNull(),
    rating: doublePrecision().notNull().default(0),
    authorId: uuid()
      .notNull()
      .references(() => UserTable.id, {
        onDelete: "cascade",
      }),
    agentId: uuid()
      .notNull()
      .references(() => AgentTable.id, {
        onDelete: "cascade",
      }),
    createdAt,
    updatedAt,
  },
  (table) => [
    unique("unique_user_agent_rating").on(table.authorId, table.agentId),
    index("ratings_agent_id_idx").on(table.agentId),
  ]
);

export const ratingRelations = relations(RatingTable, ({ one }) => ({
  author: one(UserTable, {
    fields: [RatingTable.authorId],
    references: [UserTable.id],
  }),
  agent: one(AgentTable, {
    fields: [RatingTable.agentId],
    references: [AgentTable.id],
  }),
}));
