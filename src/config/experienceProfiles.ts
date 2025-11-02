export interface ExperienceProfile {
  key: string;
  title: string;
  anchor: string;
  description: string;
  order_description: string;
  order: number;
  visible: boolean;
}

export const experienceProfiles: ExperienceProfile[] = [
  {
    key: 'Overview',
    title: 'Overview',
    anchor: 'overview',
    description: 'A comprehensive view of my career journey, highlighting key experiences, achievements, and the evolution of my expertise across product strategy, execution, and technology leadership.',
    order_description: 'Engagements ordered chronologically.',
    order: 1,
    visible: true,
  },
  {
    key: 'ProductStrategist',
    title: 'Product Strategist',
    anchor: 'product-strategist',
    description: 'Defines product vision, market alignment, and growth priorities—balancing user needs, business value, and feasibility to create long-term impact.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 2,
    visible: true,
  },
  {
    key: 'ExecutionLead',
    title: 'Execution Lead',
    anchor: 'execution-lead',
    description: 'Turns plans into shipped outcomes—leading delivery across complex environments while balancing speed, quality, and strategic trade-offs to stay aligned with product goals.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 3,
    visible: true,
  },
  {
    key: 'GrowthAndBD',
    title: 'Growth & Behavioural Design',
    anchor: 'growth-behavioural-design',
    description: 'Applies behavioural science and user psychology to drive activation, retention, and habit formation—designing product experiences that align user motivation with business outcomes.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 4,
    visible: true,
  },
  {
    key: 'DigitalEnabler',
    title: 'Digital Enabler',
    anchor: 'digital-enabler',
    description: 'Builds and refines internal platforms, tools, and automation—improving operational visibility, team efficiency, and cross-system data flows.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 5,
    visible: true,
  },
  {
    key: 'FractionalPm',
    title: 'Fractional PM',
    anchor: 'fractional-pm',
    description: 'Rapidly adapts to client needs—jumping into high-context environments to scope, align, and deliver as a flexible and experienced product partner.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 6,
    visible: true,
  },
  {
    key: 'CollaborativeLeader',
    title: 'Collaborative Leader',
    anchor: 'collaborative-leader',
    description: 'Shapes open, outcome-focused team culture—championing transparency, psychological safety, and shared ownership to unlock high performance.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 7,
    visible: true,
  },
  {
    key: 'CommercialStrategist',
    title: 'Commercial Strategist',
    anchor: 'commercial-strategist',
    description: 'Connects product thinking with business outcomes—building scalable models, pricing, market narratives, and systems that drive adoption and growth.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 8,
    visible: true,
  },
  {
    key: 'StrategicTechnologist',
    title: 'Technology Strategist',
    anchor: 'technology-strategist',
    description: 'Bridges product vision and technical reality—making informed architecture decisions, evaluating feasibility, and ensuring solutions scale sustainably.',
    order_description: 'Engagements ordered by relevance, not chronologically.',
    order: 9,
    visible: true,
  },
];
