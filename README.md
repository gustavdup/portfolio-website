# Astro Portfolio Site

A personal portfolio website built with Astro, TailwindCSS, and optional React. Inspired by https://prateekkeshari.com/.

## Features
- Fully responsive design (mobile, tablet, desktop, ultra-wide)
- Modular components and layouts
- Blog and project content managed via Markdown/MDX
- Experience page with context toggle
- Dark mode, smooth scroll, accessible HTML
- Placeholder for future React chatbot widget

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Start the development server
```
npm run dev
```

### 3. Build for production
```
npm run build
```

### 4. Preview production build
```
npm run preview
```

## Deployment

Deploy easily to Vercel:
1. Push your code to GitHub
2. Connect your repo on [vercel.com](https://vercel.com/)
3. Set build command: `npm run build`
4. Set output directory: `dist`

## Project Structure
- `/src/pages` — Astro pages (routes)
- `/src/components` — UI components
- `/src/layouts` — Layout wrappers
- `/src/content` — Blog posts, projects, experience (Markdown/MDX)
- `/public` — Static assets

## Customization
- Add blog posts/projects by creating new Markdown/MDX files in `/src/content`
- Update navigation and site config in `/src/components` and `/src/layouts`

---

For more details, see Astro and TailwindCSS documentation.
