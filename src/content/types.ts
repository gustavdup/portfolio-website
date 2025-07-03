import type { CollectionEntry } from "astro:content";

export interface BlogPost extends CollectionEntry<"blog"> {}
export interface Project extends CollectionEntry<"projects"> {}

// Experience collection types
export interface ExperienceProduct extends CollectionEntry<"experienceProduct"> {}
export interface ExperienceTechnology extends CollectionEntry<"experienceTechnology"> {}
export interface ExperienceStrategy extends CollectionEntry<"experienceStrategy"> {}
export interface ExperienceUX extends CollectionEntry<"experienceUX"> {}
export interface ExperienceLeadership extends CollectionEntry<"experienceLeadership"> {}

// Union type for all experience types
export type Experience = 
  | ExperienceProduct 
  | ExperienceTechnology 
  | ExperienceStrategy 
  | ExperienceUX 
  | ExperienceLeadership;
