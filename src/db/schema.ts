import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";
import { z } from "zod";

/*
 * Wallets
 */
export const wallets = pgTable("wallets", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  userId: text("user_id").notNull(),
  plaidId: text("plaid_id"),
});

export const walletsToTransactions = relations(wallets, ({ many }) => ({
  transactions: many(transactions),
}));

export const walletInsertSchema = createInsertSchema(wallets);

/*
 * Categories
 */
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  userId: text("user_id").notNull(),
  plaidId: text("plaid_id"),
});

export const categoriesToTransactions = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const categoryInsertSchema = createInsertSchema(categories);

/*
 * Transactions
 */
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  issue_date: timestamp("issue_date", { mode: "date" }).notNull(),
  fv_ref_url: text("fv_ref_url").notNull(),
  status: text("status").notNull(),
  walletId: text("wallet_id").references(() => wallets.id, {
    onDelete: "cascade",
  }),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  file: text("file"),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(wallets, {
    fields: [transactions.walletId],
    references: [wallets.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const transactionInsertSchema = createInsertSchema(transactions, {
  issue_date: z.coerce.date(),
  file: z.any().optional(),
});

export type Transaction = z.infer<typeof transactionInsertSchema>;

/*
 * Users
 */
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

/*
 * Accounts
 */
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

/*
 * Sessions
 */
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

/*
 * Verification tokens
 */
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
