import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { generatePlanSchema, generateIdeaSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client using Replit AI env vars
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // --- Leads ---
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // --- AI: Growth Plan ---
  app.post(api.ai.generatePlan.path, async (req, res) => {
    try {
      const input = generatePlanSchema.parse(req.body);
      
      const prompt = `
        Act as a digital growth strategist. Create a 360° growth plan for a ${input.businessCategory} business.
        City: ${input.city || "Not specified"}
        Budget: ${input.budget || "Not specified"}
        Goal: ${input.goal}

        Return a JSON object with these keys:
        - marketingChannels (array of strings)
        - websiteNeeds (array of strings)
        - automations (array of strings)
        - timeline (string)

        Keep it concise and punchy.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.1", // Or use a supported model
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const responseContent = completion.choices[0].message.content;
      if (!responseContent) throw new Error("No AI response");

      const planData = JSON.parse(responseContent);

      // Save to DB (optional, but good for data)
      await storage.createGrowthPlan({
        businessCategory: input.businessCategory,
        city: input.city,
        budget: input.budget,
        goal: input.goal,
        generatedPlan: planData
      });

      res.json(planData);

    } catch (error) {
      console.error("AI Plan Error:", error);
      res.status(500).json({ message: "Failed to generate plan" });
    }
  });

  // --- AI: Idea Generator ---
  app.post(api.ai.generateIdea.path, async (req, res) => {
    try {
      const input = generateIdeaSchema.parse(req.body);

      const prompt = `
        Act as a SaaS product manager. Generate digital ideas for a ${input.businessType} facing this problem: "${input.problem}".
        
        Return a JSON object with these keys:
        - websiteFeatures (array of strings)
        - appIdeas (array of strings)
        - automationWorkflows (array of strings)
        - crmUsage (array of strings)
        - monetization (array of strings)

        Focus on high-value, modern solutions.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.1", 
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const responseContent = completion.choices[0].message.content;
      if (!responseContent) throw new Error("No AI response");

      const ideaData = JSON.parse(responseContent);
      res.json(ideaData);

    } catch (error) {
      console.error("AI Idea Error:", error);
      res.status(500).json({ message: "Failed to generate ideas" });
    }
  });

  return httpServer;
}
