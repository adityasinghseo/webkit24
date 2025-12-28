import { db } from "./db";
import { 
  leads, insertLeadSchema,
  growthPlans, insertGrowthPlanSchema,
  type Lead, type InsertLead,
  type GrowthPlan, type InsertGrowthPlan 
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Growth Plans
  createGrowthPlan(plan: InsertGrowthPlan): Promise<GrowthPlan>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async createGrowthPlan(insertPlan: InsertGrowthPlan): Promise<GrowthPlan> {
    const [plan] = await db.insert(growthPlans).values(insertPlan).returning();
    return plan;
  }
}

export const storage = new DatabaseStorage();
