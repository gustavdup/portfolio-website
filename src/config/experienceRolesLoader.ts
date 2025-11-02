import fs from 'fs';
import path from 'path';

export interface ExperienceRole {
  slug: string;
  data: {
    company: string;
    title: string;
    timeframe: string;
    engagement_type?: string;
    type_location?: string;
    location?: string;
    header?: string;
    footer?: string;
    visible: boolean;
  };
}

// Simple frontmatter parser
function parseFrontmatter(content: string): any {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const frontmatter = match[1];
  const data: any = {};
  
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Convert boolean strings
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      
      data[key] = value;
    }
  }
  
  return data;
}

export async function loadExperienceRoles(): Promise<ExperienceRole[]> {
  const rolesDir = path.join(process.cwd(), 'src', 'config', 'experienceRoles');
  const files = fs.readdirSync(rolesDir).filter(file => file.endsWith('.md'));
  
  const roles: ExperienceRole[] = files.map(file => {
    const filePath = path.join(rolesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = parseFrontmatter(fileContent);
    
    return {
      slug: file.replace('.md', ''),
      data: {
        company: data.company,
        title: data.title,
        timeframe: data.timeframe,
        engagement_type: data.engagement_type,
        type_location: data.type_location,
        location: data.location,
        header: data.header,
        footer: data.footer,
        visible: data.visible ?? true,
      }
    };
  });
  
  return roles;
}
