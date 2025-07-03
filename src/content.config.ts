import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    category: z.array(z.string()).optional(),
    tech: z.array(z.string()).optional(),
    summary: z.string().optional(),
    details: z.string().optional(),
    image: z.string().optional(),
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
  }),
});

// Export collections for Astro to pick up
export const collections = {
  blog,
  projects,
  experienceProduct,
  experienceTechnology,
  experienceStrategy,
  experienceUX,
  experienceLeadership,
  education,
};