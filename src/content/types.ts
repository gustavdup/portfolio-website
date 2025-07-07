import type { CollectionEntry } from "astro:content";

// Core content types
export interface Article extends CollectionEntry<"articles"> {}
export interface Project extends CollectionEntry<"projects"> {}
export interface Bio extends CollectionEntry<"bio"> {}
export interface Education extends CollectionEntry<"education"> {}
export interface CurrentRole extends CollectionEntry<"currentRoles"> {}
export interface Page extends CollectionEntry<"pages"> {}
export interface WorkWithMe extends CollectionEntry<"workWithMe"> {}

// Experience collection types - new role-based structure
export interface ExperienceProductStrategist extends CollectionEntry<"experienceProductStrategist"> {}
export interface ExperienceExecutionLead extends CollectionEntry<"experienceExecutionLead"> {}
export interface ExperienceDigitalEnabler extends CollectionEntry<"experienceDigitalEnabler"> {}
export interface ExperienceFractionalPm extends CollectionEntry<"experienceFractionalPm"> {}
export interface ExperienceCollaborativeLeader extends CollectionEntry<"experienceCollaborativeLeader"> {}
export interface ExperienceCommercialStrategist extends CollectionEntry<"experienceCommercialStrategist"> {}
export interface ExperienceStrategicTechnologist extends CollectionEntry<"experienceStrategicTechnologist"> {}

// Union type for all experience types
export type Experience = 
  | ExperienceProductStrategist
  | ExperienceExecutionLead
  | ExperienceDigitalEnabler
  | ExperienceFractionalPm
  | ExperienceCollaborativeLeader
  | ExperienceCommercialStrategist
  | ExperienceStrategicTechnologist;

// Experience collections mapping for component props
export interface ExperienceCollections {
  experienceProductStrategistExperiences: ExperienceProductStrategist[];
  experienceExecutionLeadExperiences: ExperienceExecutionLead[];
  experienceDigitalEnablerExperiences: ExperienceDigitalEnabler[];
  experienceFractionalPmExperiences: ExperienceFractionalPm[];
  experienceCollaborativeLeaderExperiences: ExperienceCollaborativeLeader[];
  experienceCommercialStrategistExperiences: ExperienceCommercialStrategist[];
  experienceStrategicTechnologistExperiences: ExperienceStrategicTechnologist[];
}
