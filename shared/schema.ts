import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  googleId: text('google_id').unique(),
  stripeCustomerId: text('stripe_customer_id'),
  subscriptionStatus: text('subscription_status').default('inactive'),
  subscriptionId: text('subscription_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const scripts = pgTable('scripts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  content: text('content').notNull(),
  topic: text('topic'),
  tone: text('tone'),
  length: text('length'),
  audience: text('audience'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Script = typeof scripts.$inferSelect;
export type NewScript = typeof scripts.$inferInsert;