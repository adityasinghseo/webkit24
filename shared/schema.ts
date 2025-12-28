import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import * as chat from "./models/chat";

// Re-export chat models
export * from "./models/chat";

// === LEADS TABLE ===
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  businessType: text("business_type"), // e.g., 'SaaS', 'Ecommerce'
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });

// === GROWTH PLANS ===
export const growthPlans = pgTable("growth_plans", {
  id: serial("id").primaryKey(),
  businessCategory: text("business_category").notNull(),
  city: text("city"),
  budget: text("budget"),
  goal: text("goal"), // 'leads', 'sales', 'branding'
  websiteStatus: text("website_status"),
  targetAudience: text("target_audience"),
  competitors: text("competitors"),
  usp: text("usp"),
  generatedPlan: jsonb("generated_plan").notNull(), // JSON blob of the AI response
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGrowthPlanSchema = createInsertSchema(growthPlans).omit({ id: true, createdAt: true, generatedPlan: true });

// === TYPES ===
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type GrowthPlan = typeof growthPlans.$inferSelect;
export type InsertGrowthPlan = z.infer<typeof insertGrowthPlanSchema>;

// Input for generating a growth plan (frontend sends this)
export const generatePlanSchema = z.object({
  businessCategory: z.string(),
  city: z.string().optional(),
  budget: z.string().optional(),
  goal: z.string(),
  websiteStatus: z.string().optional(),
  targetAudience: z.string().optional(),
  competitors: z.string().optional(),
  usp: z.string().optional(),
});
export type GeneratePlanRequest = z.infer<typeof generatePlanSchema>;

// Input for idea generator
export const generateIdeaSchema = z.object({
  businessType: z.string(),
  problem: z.string(),
});
export type GenerateIdeaRequest = z.infer<typeof generateIdeaSchema>;

// Response type for AI generators
export type AIPlanResponse = {
  marketingChannels: string[];
  websiteNeeds: string[];
  automations: string[];
  timeline: string;
  whyHireWebkit24?: string;
};

export interface AIIdeaResponse {
  websiteFeatures: string[];
  appIdeas: string[];
  automationWorkflows: string[];
  crmUsage: string[];
  monetization: string[];
}
