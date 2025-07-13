# Astro Portfolio Site

A modern personal portfolio website built with Astro, TailwindCSS, and React components. Features a clean, professional design with comprehensive content management and advanced navigation.

## Features
- **Fully responsive design** — Optimized for mobile, tablet, desktop, and ultra-wide displays
- **Content collections** — Blog posts, projects, experience, and collaboration content managed via Markdown/MDX
- **Advanced navigation** — Tabbed interfaces with anchor linking for experience profiles and engagement types
- **React integration** — Dynamic components for enhanced interactivity and state management
- **Modern UX** — Dark mode support, smooth transitions, loading skeletons, and accessible HTML
- **SEO optimized** — Proper meta tags, structured content, and semantic markup
- **Modular architecture** — Reusable components and clean separation of concerns

## Pages Overview
- **Home** — Hero section, featured projects, and contact information
- **Experience** — Professional background organized by role profiles with anchor navigation
- **Projects** — Portfolio showcase with detailed project information
- **Articles** — Blog posts and thought leadership content
- **Let's Collaborate** — Three engagement types (consulting, fractional, permanent) with contact section

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## Deployment

Deploy easily to Vercel:
1. Push your code to GitHub
2. Connect your repo on [vercel.com](https://vercel.com/)
3. Set build command: `npm run build`
4. Set output directory: `dist`

## Project Structure
```
├── src/
│   ├── pages/              # Astro pages (routes)
│   │   ├── index.astro     # Homepage
│   │   ├── experience.astro # Professional experience
│   │   ├── projects.astro   # Portfolio projects
│   │   ├── articles.astro   # Blog/articles
│   │   └── lets-work-together.astro # Collaboration page
│   ├── components/         # UI components
│   │   ├── ExperienceListReact.jsx # Experience profiles (React)
│   │   ├── WorkWithMeReact.jsx     # Engagement types (React)
│   │   ├── Navbar.astro            # Navigation component
│   │   └── ...             # Other components
│   ├── layouts/            # Layout wrappers
│   │   └── Layout.astro    # Main layout template
│   ├── content/            # Content collections (Markdown/MDX)
│   │   ├── articles/       # Blog posts
│   │   ├── projects/       # Portfolio projects
│   │   ├── experience*/    # Professional experience by role
│   │   ├── workWithMe/     # Collaboration content
│   │   └── ...             # Other content types
│   └── styles/             # Global styles
└── public/                 # Static assets
```

## Content Management

### Availability Status System
Control your availability status on the "Let's Collaborate" page through the contact.md file:

**Location**: `/src/content/workWithMe/contact.md`

```yaml
---
availability_message: "Your custom availability message here"
availability_level: "high"  # Options: "high", "medium", "low"
---
```

**Visual Indicators:**
- **High**: Green background (`availability_level: "high"`)
- **Medium**: Orange background (`availability_level: "medium"`)  
- **Low**: Red background (`availability_level: "low"`)

### Experience Notes
Add optional notes to experience entries that appear below responsibilities:

```yaml
---
company: "Company Name"
title: "Job Title"
# ... other fields
note: "Currently Engaged as Strategic Consultant"  # Optional
---
```

The note will display in italic, centered text with primary green color.

### Experience Profile Descriptions
Each experience profile has customizable messaging:

**Location**: `/src/components/ExperienceListReact.jsx`

```javascript
const roleDescriptions = {
  ProductStrategist: {
    description: "Your role description here",
    order_description: "Custom ordering message here"
  }
}
```

### Visibility Controls
Control which content appears on your site:

**Experience Entries:**
```yaml
---
visible: true  # Set to false to hide
order: 1       # Control display order
---
```

**Page-level Controls** (in `/src/content/bio/bio.md`):
```yaml
---
showArticles: true     # Show/hide articles page
showProjects: true     # Show/hide projects page  
showExperience: true   # Show/hide experience page
---
```

### Adding New Content
- **Blog posts**: Create `.md` files in `/src/content/articles/`
- **Projects**: Create `.md` files in `/src/content/projects/`
- **Experience**: Add to appropriate role-based folders in `/src/content/experience*/`
- **Collaboration types**: Update files in `/src/content/workWithMe/`

### Content Structure
All content uses frontmatter for metadata and markdown for body content:
```yaml
---
title: "Content Title"
description: "Brief description"
date: 2025-01-01
tags: ["tag1", "tag2"]
---

Content body in markdown...
```

## Key Features

### Anchor Navigation
Both the Experience and Let's Collaborate pages support direct linking to specific sections:
- `/experience#product-strategist` — Links directly to Product Strategist profile
- `/lets-work-together#fractional` — Links directly to Fractional Leadership section

### React Components
- **Client-side hydration** — Prevents hydration mismatches with loading skeletons
- **State management** — URL hash synchronization with component state
- **Event handling** — Browser navigation and hash change detection

### Responsive Design
- **Mobile-first** — Optimized for touch interfaces and small screens
- **Progressive enhancement** — Enhanced features for larger displays
- **Accessibility** — ARIA labels, keyboard navigation, and semantic HTML

## Customization
- **Content**: Add/edit Markdown files in `/src/content/` directories
- **Styling**: Modify TailwindCSS classes or update `/src/styles/global.css`
- **Components**: Create new components in `/src/components/`
- **Navigation**: Update `/src/components/Navbar.astro`
- **Layout**: Modify `/src/layouts/Layout.astro`

## Technologies Used
- **[Astro](https://astro.build/)** — Static site generator with partial hydration
- **[TailwindCSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[React](https://reactjs.org/)** — Interactive components
- **[Markdown/MDX](https://mdxjs.com/)** — Content authoring

---

For more details, see [Astro documentation](https://docs.astro.build/) and [TailwindCSS documentation](https://tailwindcss.com/docs).
