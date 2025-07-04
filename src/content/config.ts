import { z, defineCollection } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    category: z.array(z.string()).optional(),
    tech: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    details: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    visible: z.boolean().optional(),
  }),
});

const bio = defineCollection({
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    location: z.string().optional(),
    email: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const currentRoles = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    roleType: z.string().optional(),
    timeframe: z.string(),
    location: z.string().optional(),
    order: z.number().optional(),
    visible: z.boolean().optional(),
  }),
});

const education = defineCollection({
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    period: z.string(),
    status: z.string().optional(),
    featured: z.boolean().optional(),
    visible: z.boolean().optional(),
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
  }),
});

// Export as default for Astro to pick up
export default {
  articles,
  projects,
  bio,
  currentRoles,
  education,
  experienceProduct,
  experienceTechnology,
  experienceStrategy,
  experienceUX,
  experienceLeadership,
};