/**
 * Experience Order Configuration
 * 
 * Centralized ordering for all experience collections.
 * Lower numbers appear first in each section.
 * 
 * Usage:
 * - Each key corresponds to an experience collection folder
 * - Filenames (without .md extension) are matched against markdown files
 * - Order values determine display sequence (1 = first, 2 = second, etc.)
 * - If a file isn't listed, it will appear last (order 999)
 * - If multiple files have the same order, they'll be sorted alphabetically
 */

export interface ExperienceOrder {
  [filename: string]: number;
}

export const experienceOrder = {
  // Overview: Chronological order (most recent first)
  overview: {
    "medici_overview": 1,                         // Aug 2025 – Present (CURRENT - most recent)
    "freelance_overview": 2,                      // Jul 2021 – Present (CURRENT - ongoing)
    "edublox_clinic_overview": 3,                 // 2016 – Present (CURRENT - ongoing CIO)
    "lvlup_overview": 4,                          // Jul 2025 – Sep 2025 (ended - most recent)
    "edublox_online_overview": 5,                 // 2017 – Aug 2025 (ended)
    "britehouse_mobility_overview": 6,            // Jan 2023 – Jul 2025 (ended)
    "mural_overview": 7,                          // Nov 2021 – Jul 2022 (ended)
    "iscann_group_overview": 8,                   // Aug 2021 - Sep 2021 (ended)
    "edublox_clinic_it_manager_overview": 9,      // 2012 – 2015 (ended)
    "edublox_clinic_it_support_overview": 10,     // 2010 – 2012 (ended)
  } as ExperienceOrder,

  // Product Strategist: Ordered by relevance to product strategy
  productStrategist: {
    "edublox_online_product_strategist": 1,           // Co-founding, long-term vision, product-market fit, international expansion
    "medici_product_strategist": 2,                   // Product-led growth, behavioural design, healthtech strategy
    "lvlup_product_strategist": 3,                    // MVP definition, strategic framework, AI product strategy
    "mural_product_strategist": 4,                    // Strategic alignment, product vision, market positioning
    "edublox_clinic_product_strategist": 5,           // Product strategy, market expansion
    "britehouse_mobility_product_strategist": 6,      // Platform product strategy
    "iscann_group_product_strategist": 7,             // Product strategy work
  } as ExperienceOrder,

  // Execution Lead: Ordered by relevance to delivery/execution
  executionLead: {
    "edublox_online_execution_lead": 1,               // MVP delivery, infrastructure migration, launch management, scale delivery
    "medici_execution_lead": 3,                       // Experimentation, A/B testing, measurable onboarding improvements (50%→80%)
    "britehouse_mobility_execution_lead": 2,          // Platform delivery, performance optimization, release management
    "mural_execution_lead": 4,                        // Feature delivery, MVP development, release management
    "edublox_clinic_execution_lead": 5,               // System implementation, infrastructure delivery
    "edublox_clinic_it_manager_execution_lead": 6,    // Project delivery, infrastructure rollout
    "iscann_group_execution_lead": 7,                 // MVP delivery, process implementation
    "edublox_clinic_it_support_execution_lead": 8,    // Support delivery, system implementation
  } as ExperienceOrder,

  // Digital Enabler: Ordered by relevance to platform/tooling work
  digitalEnabler: {
    "britehouse_mobility_digital_enabler": 1,         // Document automation, governance workflows, 80% overhead reduction
    "edublox_clinic_it_manager_digital_enabler": 2,   // Business management system, process automation, BI, operational tools
    "edublox_clinic_digital_enabler": 3,              // Internal systems, franchise enablement, CRM, operational automation
    "medici_digital_enabler": 4,                      // Analytics stack, experimentation infrastructure (customer-facing focus)
    "edublox_clinic_it_support_digital_enabler": 5,   // IT operations, support systems, infrastructure building
  } as ExperienceOrder,

  // Fractional PM: Ordered by relevance to consulting/fractional work
  fractionalPm: {
    "lvlup_fractional_pm": 2,                         // Fractional product partner, rapid strategic engagement
    "mural_fractional_pm": 1,                         // Interim leadership, rapid onboarding, short-term delivery
    "iscann_group_fractional_pm": 3,                  // Short-term consulting engagement
  } as ExperienceOrder,

  // Collaborative Leader: Ordered by relevance to leadership/culture
  collaborativeLeader: {
    "edublox_online_collaborative_leader": 1,                   // Team leadership, culture building, co-founding
    "edublox_clinic_it_manager_collaborative_leader": 2,        // Team management, leadership development
    "lvlup_collaborative_leader": 3,                            // Stakeholder alignment, leadership collaboration
    "mural_collaborative_leader": 4,                            // Team collaboration in consulting context
    "britehouse_mobility_collaborative_leader": 5,              // Cross-functional leadership
    "iscann_group_collaborative_leader": 6,                     // Team coordination
  } as ExperienceOrder,

  // Commercial Strategist: Ordered by relevance to business/commercial work
  commercialStrategist: {
    "edublox_online_commercial_strategist": 1,                  // Revenue growth, subscription monetization, business model
    "edublox_clinic_commercial_strategist": 2,                  // Revenue diversification, market expansion, franchise monetization
    "edublox_clinic_it_manager_commercial_strategist": 3,       // Business strategy, revenue growth, franchise development
  } as ExperienceOrder,

  // Strategic Technologist: Ordered by relevance to technology strategy
  strategicTechnologist: {
    "edublox_online_strategic_technologist": 1,                 // Platform architecture, infrastructure strategy, scalability
    "britehouse_mobility_strategic_technologist": 2,            // Platform architecture, enterprise integration, system scalability
    "edublox_clinic_strategic_technologist": 3,                 // Technology strategy, infrastructure architecture, platform evolution
    "mural_strategic_technologist": 4,                          // Technical feasibility, solution architecture
    "edublox_clinic_it_support_strategic_technologist": 5,      // Foundational IT, infrastructure planning
  } as ExperienceOrder,

  // Growth & Behavioural Design: Ordered by relevance to growth and behavioural design
  growthAndBD: {
    "medici_growth_and_bd": 1,                        // Behavioural science principles, trust-first onboarding, activation psychology
    "edublox_online_growth_and_bd": 2,                // Learning science, gamification, motivation systems, 50%+ activation improvement
    "lvlup_growth_and_bd": 3,                         // User behaviour design, gamification, motivation science
  } as ExperienceOrder,
};

/**
 * Helper function to get order for a file in a specific collection
 * @param collection - The experience collection name (e.g., 'productStrategist')
 * @param slug - The file slug (filename without .md extension)
 * @returns Order number (or 999 if not found, to sort at end)
 */
export function getExperienceOrder(
  collection: keyof typeof experienceOrder,
  slug: string
): number {
  return experienceOrder[collection]?.[slug] ?? 999;
}

/**
 * Sort experiences by the configured order
 * @param experiences - Array of experience items with slug
 * @param collection - The collection name
 * @returns Sorted array
 */
export function sortExperiencesByOrder<T extends { slug: string; data: { order?: number; company?: string } }>(
  experiences: T[],
  collection: keyof typeof experienceOrder
): T[] {
  return [...experiences].sort((a, b) => {
    // Use centralized config based on slug (filename) - this takes priority
    const aConfigOrder = getExperienceOrder(collection, a.slug);
    const bConfigOrder = getExperienceOrder(collection, b.slug);
    
    if (aConfigOrder !== bConfigOrder) {
      return aConfigOrder - bConfigOrder;
    }
    
    // If both have same config order, check frontmatter order as tiebreaker
    const aFrontmatterOrder = a.data.order;
    const bFrontmatterOrder = b.data.order;
    
    if (aFrontmatterOrder !== undefined && bFrontmatterOrder !== undefined) {
      return aFrontmatterOrder - bFrontmatterOrder;
    }
    if (aFrontmatterOrder !== undefined) return -1;
    if (bFrontmatterOrder !== undefined) return 1;
    
    // If same order, sort alphabetically by company name (or slug if no company)
    const aName = a.data.company || a.slug;
    const bName = b.data.company || b.slug;
    return aName.localeCompare(bName);
  });
}

/**
 * Quick reference guide for adding new files:
 * 
 * 1. Create your markdown file with a descriptive filename (e.g., "medici_product_strategist.md")
 * 2. Add the filename (without .md) to each relevant collection below
 * 3. Assign an order number (1 = first, higher = later)
 * 4. Save this file
 * 5. The changes will automatically apply to your experience page
 * 
 * Example - Adding "medici_product_strategist.md":
 * 
 * productStrategist: {
 *   "medici_product_strategist": 1,              // <- Add here as top priority
 *   "edublox_online_product_strategist": 2,      // <- Existing items shift down
 *   "freelance_product_strategist": 3,
 *   // ...
 * }
 * 
 * commercialStrategist: {
 *   "medici_commercial_strategist": 1,           // <- Can be different file, different order
 *   "edublox_online_commercial_strategist": 2,
 *   // ...
 * }
 * 
 * Filename conventions (recommended):
 * - Use lowercase
 * - Use underscores instead of spaces
 * - Format: {company}_{collection_name}.md
 * - Examples: 
 *   - medici_product_strategist.md
 *   - medici_commercial_strategist.md
 *   - yoco_execution_lead.md
 * 
 * Note: You can also override this by setting `order: X` in the markdown frontmatter,
 * but using this central file is recommended for consistency.
 */
