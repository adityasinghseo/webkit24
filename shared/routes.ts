import { z } from 'zod';
import { insertLeadSchema, generatePlanSchema, generateIdeaSchema, leads, growthPlans } from './schema';

// Error schemas
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads',
      input: insertLeadSchema,
      responses: {
        201: z.custom<typeof leads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  ai: {
    generatePlan: {
      method: 'POST' as const,
      path: '/api/ai/growth-plan',
      input: generatePlanSchema,
      responses: {
        200: z.object({
          marketingChannels: z.array(z.string()),
          websiteNeeds: z.array(z.string()),
          automations: z.array(z.string()),
          timeline: z.string(),
        }),
        500: errorSchemas.internal,
      },
    },
    generateIdea: {
      method: 'POST' as const,
      path: '/api/ai/idea-generator',
      input: generateIdeaSchema,
      responses: {
        200: z.object({
          websiteFeatures: z.array(z.string()),
          appIdeas: z.array(z.string()),
          automationWorkflows: z.array(z.string()),
          crmUsage: z.array(z.string()),
          monetization: z.array(z.string()),
        }),
        500: errorSchemas.internal,
      },
    },
  },
};

// URL builder helper
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
