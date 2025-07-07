import { z, defineCollection } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
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
    showArticles: z.boolean().default(true),
    showProjects: z.boolean().default(true),
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

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
    }),
    consulting: z.object({
      title: z.string(),
      emoji: z.string(),
      description: z.string(),
      subtitle: z.string(),
      services: z.array(z.string()),
      closing: z.string(),
    }),
    fulltime: z.object({
      title: z.string(),
      emoji: z.string(),
      description: z.string(),
      subtitle: z.string(),
      requirements: z.array(z.string()),
      closing: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      emoji: z.string(),
      description: z.string(),
      disclaimer: z.string(),
      email: z.string(),
      linkedin: z.string(),
      calendar_link: z.string(),
      buttons: z.object({
        book_call: z.string(),
        linkedin: z.string(),
        email: z.string(),
      }),
    }),
  }),
});

// New experience collections
const experienceProductStrategist = defineCollection({
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

const experienceExecutionLead = defineCollection({
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

const experienceDigitalEnabler = defineCollection({
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

const experienceFractionalPm = defineCollection({
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

const experienceCollaborativeLeader = defineCollection({
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

const experienceCommercialStrategist = defineCollection({
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

const experienceStrategicTechnologist = defineCollection({
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

// Export collections for Astro to pick up
export const collections = {
 

  
  bio,
  projects,
  articles,
  experienceProductStrategist,
  experienceExecutionLead,
  experienceDigitalEnabler,
  experienceFractionalPm,
  experienceCollaborativeLeader,
  experienceCommercialStrategist,
  experienceStrategicTechnologist,
  education,
  currentRoles,
  pages,
};