import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const wallets = pgTable("wallets", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  userId: text("user_id").notNull(),
});

// export const transactions = pgTable("transactions", {
//   id: text("id").primaryKey(),
//   userId: text("user_id").notNull(),
//   categoryId: text("category_id").notNull(),
//   title: text("title").notNull(),
//   amount: text("amount").notNull(),
//   issue_date: text("issue_date").notNull(),
//   fv_ref_url: text("fv_ref_url").notNull(),
//   status: text("status").notNull(),
// });

// export const categories = pgTable("categories", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
// });

export const walletInsertSchema = createInsertSchema(wallets);
// export const transactionInsertSchema = createInsertSchema(transactions);
// export const categoryInsertSchema = createInsertSchema(categories);
