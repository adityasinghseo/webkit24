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
  createGrowthPlan(plan: InsertGrowthPlan & { generatedPlan: any }): Promise<GrowthPlan>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async createGrowthPlan(insertPlan: InsertGrowthPlan & { generatedPlan: any }): Promise<GrowthPlan> {
    // We cast to any because strict type checking complains about mismatched omit/add
    const [plan] = await db.insert(growthPlans).values(insertPlan as any).returning();
    return plan;
  }
}

export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private growthPlans: Map<number, GrowthPlan>;
  private currentLeadId: number;
  private currentPlanId: number;

  constructor() {
    this.leads = new Map();
    this.growthPlans = new Map();
    this.currentLeadId = 1;
    this.currentPlanId = 1;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = {
      ...insertLead,
      id,
      company: insertLead.company ?? null,
      phone: insertLead.phone ?? null,
      businessType: insertLead.businessType ?? null,
      message: insertLead.message ?? null,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async createGrowthPlan(insertPlan: InsertGrowthPlan & { generatedPlan: any }): Promise<GrowthPlan> {
    const id = this.currentPlanId++;
    const plan: GrowthPlan = {
      ...insertPlan,
      id,
      city: insertPlan.city ?? null,
      budget: insertPlan.budget ?? null,
      goal: insertPlan.goal ?? null,
      generatedPlan: insertPlan.generatedPlan || {},
      createdAt: new Date(),
    };
    this.growthPlans.set(id, plan);
    return plan;
  }
}

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
