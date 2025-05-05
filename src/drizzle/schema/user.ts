import {
  doublePrecision,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { RatingTable } from "./rating";
import { AgentTable } from "./agent";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable(
  "users",
  {
    id,
    clerkUserId: text().notNull().unique(),
    name: text().notNull(),
    email: text().notNull().unique(),
    role: userRoleEnum().notNull().default("user"),
    credits: doublePrecision().notNull().default(0),
    deleteAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index("users_email_idx").on(table.email)]
);

export const userRelations = relations(UserTable, ({ many }) => ({
  ratings: many(RatingTable),
  agents: many(AgentTable),
}));
