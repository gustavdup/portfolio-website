import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const bio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tech: z.array(z.string()).optional(),
    summary: z.string().optional(),
    details: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const experienceProduct = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const experienceTechnology = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const experienceStrategy = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const experienceUX = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const experienceLeadership = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    period: z.string(),
    status: z.string().optional(),
    visible: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const currentRoles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    roleType: z.string(), // Full-time, Contractor, Freelance, etc.
    timeframe: z.string(),
    location: z.string().optional(),
    visible: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

// Export collections for Astro to pick up
export const collections = {
  blog,
  bio,
  projects,
  experienceProduct,
  experienceTechnology,
  experienceStrategy,
  experienceUX,
  experienceLeadership,
  education,
  currentRoles,
};