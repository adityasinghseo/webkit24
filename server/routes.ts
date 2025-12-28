import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { generatePlanSchema, generateIdeaSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";
import fs from 'fs';

// Initialize OpenAI client for OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "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",
  defaultHeaders: {
    "HTTP-Referer": "https://stackblitz.com",
    "X-Title": "SaaS Website",
  }
});

// List of free models to try in order
const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "deepseek/deepseek-r1:free",
  "deepseek/deepseek-chat:free",
  "meta-llama/llama-3.2-11b-vision-instruct:free",
];

async function generateWithFallback(prompt: string, retries = 0): Promise<string> {
  const model = FREE_MODELS[retries];

  if (!model) {
    throw new Error("All models failed to generate content.");
  }

  try {
    console.log(`Attempting generation with model: ${model}`);
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from AI");

    return content;

  } catch (err: any) {
    const msg = `Model ${model} failed: ${err.message}`;
    console.error(msg);
    fs.appendFileSync('error.log', `${new Date().toISOString()} - ${msg}\n`);
    // Recursively try the next model
    return generateWithFallback(prompt, retries + 1);
  }
}

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

      const budgetLevel = input.budget === "scale" || input.budget === "enterprise" ? "High" : "Low";
      const prompt = `
        Act as a Senior Digital Strategist for Webkit24 (a premium digital agency). 
        Create a 360° growth plan for a ${input.businessCategory} business.
        City: ${input.city || "Not specified"}
        Budget Level: ${budgetLevel} (${input.budget})
        Goal: ${input.goal}
        
        Context:
        - Current Website Status: ${input.websiteStatus || "Unknown"}
        - Target Audience: ${input.targetAudience || "General Public"}
        - Unique Selling Point (USP): ${input.usp || "None listed"}

        Your Strategy Logic:
        1. If Budget is LOW: Focus on "Essential Foundation", "Local SEO", "Content Marketing", and "Social Media Presence".
        2. If Budget is HIGH: Focus on "Custom Software/App Development", "Advanced AI Automation", "Paid Ad Scaling", and "CRM Integration".
        3. ALWAYS frame suggestions as "Professional Strategies" that require expert execution (e.g., "Implement Advanced Schema" instead of just "Fix SEO").

        Return ONLY a raw JSON object (no markdown formatting) with these keys:
        - marketingChannels (array of strings, specific to budget)
        - websiteNeeds (array of strings, e.g., "Custom React Development", "Landing Page Optimization")
        - automations (array of strings, e.g., "AI Chatbot", "Email Sequences")
        - timeline (string, e.g. "4-6 Weeks for MVP")
        - whyHireWebkit24 (string, 1 punchy sentence why they need professional help for this specific plan)

        Keep it concise, professional, and punchy.
      `;

      let text = await generateWithFallback(prompt);

      // Cleanup markdown code blocks if present
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const planData = JSON.parse(text);

      // Save to DB (optional, but good for data)
      await storage.createGrowthPlan({
        businessCategory: input.businessCategory,
        city: input.city,
        budget: input.budget,
        goal: input.goal,
        generatedPlan: planData
      });

      res.json(planData);

    } catch (error: any) {
      const errorLog = `Timestamp: ${new Date().toISOString()}\nError: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}\n\n`;
      fs.appendFileSync('error.log', errorLog);
      console.error("AI Plan Error:", errorLog);
      res.status(500).json({ message: "Failed to generate plan" });
    }
  });

  // --- AI: Idea Generator ---
  app.post(api.ai.generateIdea.path, async (req, res) => {
    try {
      const input = generateIdeaSchema.parse(req.body);

      const prompt = `
        Act as a SaaS product manager. Generate digital ideas for a ${input.businessType} facing this problem: "${input.problem}".
        
        Return ONLY a raw JSON object (no markdown formatting) with these keys:
        - websiteFeatures (array of strings)
        - appIdeas (array of strings)
        - automationWorkflows (array of strings)
        - crmUsage (array of strings)
        - monetization (array of strings)

        Focus on high-value, modern solutions.
      `;

      let text = await generateWithFallback(prompt);

      // Cleanup markdown code blocks if present
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const ideaData = JSON.parse(text);
      res.json(ideaData);

    } catch (error: any) {
      const errorLog = `Timestamp: ${new Date().toISOString()}\nError: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}\n\n`;
      fs.appendFileSync('error.log', errorLog);
      console.error("AI Idea Error:", errorLog);
      res.status(500).json({ message: "Failed to generate ideas" });
    }
  });

  return httpServer;
}
