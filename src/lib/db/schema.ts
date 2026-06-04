import { date, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careerStacks = pgTable("career_stacks", {
  id: serial("id").primaryKey(),
  careerId: integer("career_id").notNull().references(() => careers.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const careersRelations = relations(careers, ({ many }) => ({
  stacks: many(careerStacks),
}));

export const careerStacksRelations = relations(careerStacks, ({ one }) => ({
  career: one(careers, {
    fields: [careerStacks.careerId],
    references: [careers.id],
  }),
}));

export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  school: varchar("school", { length: 100 }).notNull(),
  degree: varchar("degree", { length: 100 }).notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  note: text("note"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
