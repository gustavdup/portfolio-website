import type { CollectionEntry } from "astro:content";

export interface BlogPost extends CollectionEntry<"blog"> {}
export interface Project extends CollectionEntry<"projects"> {}
export interface Experience extends CollectionEntry<"experience"> {}
