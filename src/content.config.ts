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
    showExperience: z.boolean().default(true),
    linkedinUrl: z.string().optional(),
  }),
});

const availability = defineCollection({
  type: 'content',
  schema: z.object({
    message: z.string().optional(), // Fallback message for both pages
    homeMessage: z.string().optional(), // Specific message for home page
    contactMessage: z.string().optional(), // Specific message for contact page
    level: z.enum(['high', 'medium', 'low']),
    showOnAbout: z.boolean().default(false),
    showOnContact: z.boolean().default(true),
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

// New experience collections
const experienceProductStrategist = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
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
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const experienceOverview = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    title: z.string(),
    timeframe: z.string(),
    location: z.string().optional(),
    context: z.array(z.string()).optional(),
    header: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    footer: z.string().optional(),
    visible: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const workWithMe = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string().optional(), // "contact" for contact section, undefined for tabs
    slug: z.string().optional(),
    order: z.number().optional(),
    cta: z.string().optional(),
    ctaLink: z.string().optional(),
    // For contact.md specifically
    email: z.string().optional(),
    linkedin: z.string().optional(),
    calendar_link: z.string().optional(),
    header_text: z.string().optional(),
    footer_text: z.string().optional(),
    buttons: z.object({
      book_call: z.string(),
      linkedin: z.string(),
      email: z.string(),
    }).optional(),
  }),
});

// Export collections for Astro to pick up
export const collections = {
  bio,
  availability,
  projects,
  articles,
  experienceOverview,
  experienceProductStrategist,
  experienceExecutionLead,
  experienceDigitalEnabler,
  experienceFractionalPm,
  experienceCollaborativeLeader,
  experienceCommercialStrategist,
  experienceStrategicTechnologist,
  education,
  currentRoles,
  workWithMe,
};