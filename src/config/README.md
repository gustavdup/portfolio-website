# Experience Configuration System

This directory contains the centralized configuration for managing experience data, including:
- **Role metadata** (company info, engagement types, locations)
- **Profile definitions** (titles, descriptions, ordering, visibility)
- **Display order** for experiences within each profile

## Quick Start

### Reorder Experiences
Edit **`experienceOrder.ts`** and use **filenames** (without `.md` extension).

### Add/Edit Roles
Edit markdown files in **`experienceRoles/`** folder.

### Manage Profiles
Edit **`experienceProfiles.ts`** to reorder tabs, toggle visibility, or update descriptions.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Experience Roles (Role Metadata)](#experience-roles-role-metadata)
3. [Experience Profiles (Tab Configuration)](#experience-profiles-tab-configuration)
4. [Experience Ordering](#experience-ordering)
5. [Adding New Content](#adding-new-content)
6. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The experience system separates **role metadata** from **experience content**:

```
src/
├── config/
│   ├── experienceRoles/          ← Company/role metadata (single source of truth)
│   │   ├── medici.md
│   │   ├── freelance.md
│   │   └── ...
│   ├── experienceProfiles.ts     ← Profile/tab configuration & ordering
│   ├── experienceOrder.ts        ← Experience display order per profile
│   └── experienceRolesLoader.ts  ← Custom loader for role metadata
│
└── content/
    ├── experienceOverview/       ← Experience content files (reference roles via roleId)
    ├── experienceProductStrategist/
    ├── experienceExecutionLead/
    ├── experienceGrowthAndBD/
    └── ...                       ← 9 total experience collections
```

### Why This Structure?

**Before:** Role metadata (company name, title, dates, location) duplicated across 40+ files  
**After:** Role metadata lives in ONE file per company, referenced by experience files via `roleId`

**Benefits:**
- ✅ Update company info once, applies everywhere
- ✅ Easy to reorder profiles (tabs) in one central config
- ✅ Toggle profile visibility without deleting files
- ✅ Consistent role data across all profiles

---

## Experience Roles (Role Metadata)

### Location
`src/config/experienceRoles/`

### Purpose
Stores metadata about companies/roles that appears across multiple experience profiles.

### Structure

Each `.md` file represents one company/role:

```markdown
---
company: "Medici"
title: "CPO (Chief Product Officer)"
timeframe: "2023 - 2024"
engagement_type: "Contract"
type_location: "Remote"
---
```

### Available Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `company` | string | Company/organization name | `"Medici"` |
| `title` | string | Job title/role | `"CPO (Chief Product Officer)"` |
| `timeframe` | string | Employment period | `"2023 - 2024"` |
| `engagement_type` | string | Employment type | `"Contract"`, `"Freelance"`, `"Co-Owner"`, `"Permanent"` |
| `type_location` | string | Work location type | `"Remote"`, `"Hybrid"`, `"On-site"` |

### Current Roles

- `medici.md` - Medici (Contract, Remote, 2023-2024)
- `freelance.md` - Freelance (Freelance, Remote, 2020-present)
- `edublox_online.md` - Edublox Online Tutor (Co-Owner, Remote, 2017-present)
- `edublox_clinic.md` - Edublox Reading & Learning Clinic (Co-Owner, Remote, 2017-present)
- `edublox_clinic_it_manager.md` - Edublox IT Manager role
- `edublox_clinic_it_support.md` - Edublox IT Support role
- `britehouse_mobility.md` - Britehouse Mobility
- `iscann_group.md` - iScann Group
- `mural.md` - Mural
- `lvlup.md` - LvlUp

### Adding a New Role

1. Create a new `.md` file in `experienceRoles/` (e.g., `yoco.md`)
2. Add frontmatter with company metadata
3. Reference it in experience files using `roleId: "yoco"` (filename without `.md`)

**Example:**
```markdown
---
company: "Yoco"
title: "Senior Product Manager"
timeframe: "2021 - 2023"
engagement_type: "Permanent"
type_location: "Hybrid"
---
```

### Editing Role Information

Just edit the `.md` file - changes apply to **all experience profiles** that reference this role.

---

## Experience Profiles (Tab Configuration)

### Location
`src/config/experienceProfiles.ts`

### Purpose
Defines the tabs/profiles shown on the experience page, including:
- Tab order
- Visibility (show/hide)
- Titles and descriptions
- Anchor links

### Structure

```typescript
export const experienceProfiles: ExperienceProfile[] = [
  {
    key: 'ProductStrategist',                    // Collection name (must match folder)
    title: 'Product Strategist',                 // Tab label
    anchor: 'product-strategist',                // URL anchor (#product-strategist)
    description: 'Defines product vision...',    // Profile description
    order_description: 'Roles ordered by...',    // Ordering note
    order: 2,                                    // Tab position (1 = first)
    visible: true,                               // Show/hide tab
  },
  // ... 8 more profiles
];
```

### Current Profiles (9 total)

| Order | Profile | Visible | Description |
|-------|---------|---------|-------------|
| 1 | Overview | ✅ | Chronological career overview |
| 2 | Product Strategist | ✅ | Product vision & market alignment |
| 3 | Execution Lead | ✅ | Delivery & shipping outcomes |
| 4 | Growth & Behavioural Design | ❌ | Psychology-driven growth work |
| 5 | Digital Enabler | ✅ | Internal platforms & automation |
| 6 | Fractional PM | ✅ | Client consulting work |
| 7 | Collaborative Leader | ✅ | Team culture & leadership |
| 8 | Commercial Strategist | ✅ | Business models & growth |
| 9 | Technology Strategist | ✅ | Architecture & feasibility |

### Reordering Profiles

Change the `order` field to reposition tabs:

```typescript
// Move Growth & BD to position 2 (after Overview)
{
  key: 'GrowthAndBD',
  order: 2,  // ← Changed from 4
  // ...
}

// Product Strategist shifts to position 3
{
  key: 'ProductStrategist',
  order: 3,  // ← Changed from 2
  // ...
}
```

**Tabs automatically reorder based on the `order` field.**

### Hiding/Showing Profiles

Toggle the `visible` field:

```typescript
{
  key: 'GrowthAndBD',
  visible: true,  // ← Changed from false - tab now appears
  // ...
}
```

### Adding a New Profile

1. **Create content collection** folder (e.g., `src/content/experienceNewProfile/`)
2. **Add to `content.config.ts`** with schema definition
3. **Add to `experienceProfiles.ts`**:
```typescript
{
  key: 'NewProfile',
  title: 'New Profile Name',
  anchor: 'new-profile',
  description: 'Profile description...',
  order_description: 'Roles ordered by relevance.',
  order: 10,  // Position after existing profiles
  visible: true,
}
```
4. **Add to `experienceOrder.ts`** with ordering config
5. **Update `experience.astro`** to load the new collection
6. **Update `ExperienceListReact.jsx`** to map the collection

---

## Experience Ordering

### Location
`src/config/experienceOrder.ts`

### Purpose
Controls the display order of experience entries **within each profile**.

### How It Works

#### The Problem It Solves

Previously, to change the order of experiences, you had to:
1. Open each markdown file individually in `src/content/experience*/`
2. Edit the `order: X` field in frontmatter
3. Remember which number you used for other files
4. Repeat across 9 different experience folders

#### The Solution

Now you have **one central file** that controls all ordering using **filenames** (not company names):

```typescript
// src/config/experienceOrder.ts

export const experienceOrder = {
  productStrategist: {
    "medici_product_strategist": 1,              // Shows first
    "edublox_online_product_strategist": 2,      // Shows second
    "freelance_product_strategist": 3,           // Shows third
    // ...
  },
  growthAndBD: {
    "medici_growth_and_bd": 1,                   // Different ordering per profile
    "freelance_growth_and_bd": 2,
  },
  // ... other collections
};
```

**Key Point:** Use the **filename without `.md`**, NOT the company name from role metadata.

### Usage Guide

#### Reordering Existing Files

1. Open `experienceOrder.ts`
2. Find the collection you want to reorder (e.g., `productStrategist`)
3. Change the numbers - **lower numbers appear first**
4. Use the exact **filename without `.md`** (e.g., `medici_product_strategist`)
5. Save the file
6. Done! ✅

**Example:**
```typescript
// Before (freelance_product_strategist shows first)
productStrategist: {
  "freelance_product_strategist": 1,
  "edublox_online_product_strategist": 2,
}

// After (edublox_online_product_strategist shows first)
productStrategist: {
  "edublox_online_product_strategist": 1,  // ← Swapped order
  "freelance_product_strategist": 2,
}
```

#### Adding a New Experience File

When you create a new experience markdown file:

**Steps:**
1. **Create role** (if new company): Add to `src/config/experienceRoles/yoco.md`
2. **Create experience file**: `src/content/experienceProductStrategist/yoco_product_strategist.md`
3. **Reference role**: Use `roleId: "yoco"` in experience frontmatter
4. **Add to ordering**: Update `experienceOrder.ts`

**Example experience file:**
```markdown
---
roleId: "yoco"                    # References yoco.md in experienceRoles
context: "Led B2B product..."     # Profile-specific content
visible: true
---
```

**Add to config** using the filename without `.md`:

```typescript
productStrategist: {
  "yoco_product_strategist": 1,                  // New file at top
  "medici_product_strategist": 2,                // Existing items shift down
  "edublox_online_product_strategist": 3,
  "freelance_product_strategist": 4,
},

commercialStrategist: {
  "yoco_commercial_strategist": 1,               // Can add to multiple profiles
  "medici_commercial_strategist": 2,
}
```

#### Removing an Experience

Just delete the line from the configuration. If a file isn't listed, it will appear at the end (order 999).

#### Collection-Specific Ordering

Each experience collection has **independent ordering**. The same company can appear in different positions across collections:

```typescript
export const experienceOrder = {
  // In Product Strategist view, Medici is #1
  productStrategist: {
    "medici_product_strategist": 1,
    "freelance_product_strategist": 2,
  },
  
  // In Fractional PM view, Freelance is #1
  fractionalPm: {
    "freelance_fractional_pm": 1,
    "medici_fractional_pm": 2,
  },
};
```

#### Override Behavior

You can still use `order: X` in markdown frontmatter to override the central config:

You can still use `order: X` in experience markdown frontmatter to override the central config:

**Priority:**
1. Frontmatter `order` field (if present) - **Highest priority**
2. Central config `experienceOrder.ts`
3. Alphabetical by filename - **Fallback**

**When to use frontmatter override:**
- One-off ordering needs
- Testing a new order before updating central config
- Edge cases for specific experiences

**When to use central config (recommended):**
- Managing all standard ordering
- Easy to see all orders at once
- Consistency across files

---

## Adding New Content

### Adding a New Company/Role

**File:** `src/config/experienceRoles/company_name.md`

```markdown
---
company: "Company Name"
title: "Job Title"
timeframe: "2023 - 2024"
engagement_type: "Contract"      # Contract, Freelance, Co-Owner, Permanent
type_location: "Remote"          # Remote, Hybrid, On-site
---
```

**Filename format:** Use lowercase with underscores (e.g., `yoco.md`, `curve_technologies.md`)

### Adding a New Experience Entry

**File:** `src/content/experienceProductStrategist/company_product_strategist.md`

```markdown
---
roleId: "company_name"                    # Must match role filename (without .md)
context: "Profile-specific context..."    # Optional, describes work in this profile
responsibilities: "Key achievements..."   # Optional, bullet points
visible: true                             # Show/hide this entry
---
```

**Important:**
- `roleId` must match a file in `experienceRoles/` (without `.md`)
- Filename format: `{company}_{profile}.md` (e.g., `yoco_product_strategist.md`)
- Same company can have files in multiple profile folders

### Adding to Multiple Profiles

Create separate files for each profile:

```
src/content/
├── experienceProductStrategist/
│   └── yoco_product_strategist.md        # roleId: "yoco"
├── experienceExecutionLead/
│   └── yoco_execution_lead.md            # roleId: "yoco" (same role, different content)
└── experienceCommercialStrategist/
    └── yoco_commercial_strategist.md     # roleId: "yoco"
```

Each file can have different `context` and `responsibilities` while sharing the same role metadata.

### Filename Conventions (Recommended)

✅ **Good filenames:**
- `yoco_product_strategist.md`
- `curve_technologies_execution_lead.md`
- `edublox_online_collaborative_leader.md`

❌ **Avoid:**
- `Yoco Product Strategist.md` (spaces, capitals)
- `product-strategist-yoco.md` (inconsistent format)
- `yoco.md` (not descriptive enough for experience files)

**Format:** `{company}_{profile_key}.md`

---

## Available Collections

The following experience collections are available:

| Collection Key | Folder | Profile Name | Visible |
|----------------|--------|--------------|---------|
| `overview` | `experienceOverview/` | Overview | ✅ |
| `productStrategist` | `experienceProductStrategist/` | Product Strategist | ✅ |
| `executionLead` | `experienceExecutionLead/` | Execution Lead | ✅ |
| `growthAndBD` | `experienceGrowthAndBD/` | Growth & Behavioural Design | ❌ |
| `digitalEnabler` | `experienceDigitalEnabler/` | Digital Enabler | ✅ |
| `fractionalPm` | `experienceFractionalPm/` | Fractional PM | ✅ |
| `collaborativeLeader` | `experienceCollaborativeLeader/` | Collaborative Leader | ✅ |
| `commercialStrategist` | `experienceCommercialStrategist/` | Commercial Strategist | ✅ |
| `strategicTechnologist` | `experienceStrategicTechnologist/` | Technology Strategist | ✅ |

**Note:** Collection keys must match folder names in `src/content/` (without `experience` prefix in code)

---

## Troubleshooting

### Experience doesn't appear

**Possible causes:**

1. **`roleId` doesn't match role filename**
   ```markdown
   # ❌ Wrong - roleId doesn't match filename
   roleId: "Yoco"                    # Looking for Yoco.md
   # File: yoco.md                   # Actual filename
   
   # ✅ Correct
   roleId: "yoco"                    # Matches yoco.md
   ```

2. **`visible: false` in experience frontmatter**
   ```markdown
   ---
   roleId: "yoco"
   visible: false    # ← This hides the entry
   ---
   ```

3. **Profile not visible in `experienceProfiles.ts`**
   ```typescript
   {
     key: 'GrowthAndBD',
     visible: false,  // ← Entire profile hidden
   }
   ```

4. **Role file missing in `experienceRoles/`**
   - Check that `src/config/experienceRoles/yoco.md` exists
   - Verify filename matches `roleId` exactly (case-sensitive)

### My company doesn't appear in the list

**Cause:** The `roleId` in your experience file doesn't match any role filename in `experienceRoles/`.

**Solution:** 

1. Check the experience file:
```markdown
---
roleId: "yoco"  # Must match filename exactly
---
```

2. Check role file exists:
```
src/config/experienceRoles/yoco.md  ✅
src/config/experienceRoles/Yoco.md  ❌ (wrong case)
```

3. Filenames are **case-sensitive** and should be lowercase with underscores

### Order isn't changing

**Cause:** You might have `order:` field in the experience markdown frontmatter overriding the config.

**Solution:** 
1. Check the experience file for `order: X` in frontmatter
2. Remove it to let central config take control
3. Or adjust the frontmatter order value (it takes priority)

**Example:**
```markdown
---
roleId: "yoco"
order: 1         # ← This overrides experienceOrder.ts
---
```

### An experience appears at the end unexpectedly

**Cause:** The experience filename isn't listed in the collection's config in `experienceOrder.ts`, so it defaults to order 999.

**Solution:** Add the **filename** (without `.md`) to the relevant collection:

```typescript
// experienceOrder.ts
export const experienceOrder = {
  productStrategist: {
    "yoco_product_strategist": 1,     // ← Add this line
    "medici_product_strategist": 2,
  }
};
```

### Profile tabs aren't reordering

**Cause:** Changed `experienceOrder.ts` instead of `experienceProfiles.ts`.

**Solution:** 
- Use `experienceOrder.ts` to reorder **experiences within a profile**
- Use `experienceProfiles.ts` to reorder **profile tabs**

```typescript
// experienceProfiles.ts - Controls tab order
{
  key: 'ProductStrategist',
  order: 2,  // ← Tab position (2nd tab)
}

// experienceOrder.ts - Controls experience order within ProductStrategist
productStrategist: {
  "medici_product_strategist": 1,  // ← First experience in this tab
}
```

### Role metadata not updating

**Cause:** Astro cache might be stale after editing role files.

**Solution:** Clear Astro cache and rebuild:
```bash
# Windows (cmd)
rmdir /s /q .astro
npm run dev

# Or delete .astro folder manually and restart dev server
```

### TypeScript errors about missing collections

**Cause:** New collection not added to `content.config.ts` or component props.

**Solution:**
1. Add to `src/content.config.ts`
2. Add to `src/pages/experience.astro` (load collection)
3. Add to `src/components/ExperienceListReact.jsx` (props & mapping)

---

## Helper Functions

### `loadExperienceRoles()`

Loads role metadata from `experienceRoles/` folder.

**Location:** `src/config/experienceRolesLoader.ts`

```typescript
import { loadExperienceRoles } from '@/config/experienceRolesLoader';

const roles = await loadExperienceRoles();
// Returns: Array<{slug: string, data: RoleMetadata}>
```

### `getExperienceOrder(collection, filename)`

Gets the order number for a specific experience file in a collection.

**Location:** `src/config/experienceOrder.ts`

```typescript
import { getExperienceOrder } from '@/config/experienceOrder';

const order = getExperienceOrder('productStrategist', 'medici_product_strategist');
// Returns: 1 (or 999 if not found)
```

### `sortExperiencesByOrder(experiences, collection)`

Sorts an array of experiences using the central config.

**Location:** `src/config/experienceOrder.ts` or `src/pages/experience.astro`

```typescript
import { sortExperiencesByOrder } from '@/config/experienceOrder';

const sorted = sortExperiencesByOrder(myExperiences, 'productStrategist');
// Returns experiences sorted by order config
```

---

## Best Practices

### Do ✅

- **Use central configs** for all standard ordering and profile management
- **Keep role filenames consistent:** lowercase with underscores
- **Match roleId exactly** to role filename (case-sensitive)
- **Use descriptive experience filenames:** `{company}_{profile}.md`
- **Update configs when adding/removing** companies or profiles
- **Test after major changes:** Clear `.astro` cache if needed
- **One role file per company:** Update once, applies everywhere

### Don't ❌

- **Don't mix** central config and frontmatter `order` fields unnecessarily
- **Don't use duplicate order numbers** in the same collection
- **Don't use spaces or capitals** in filenames
- **Don't forget to add new experiences** to `experienceOrder.ts`
- **Don't reference non-existent roles** via `roleId`
- **Don't edit role metadata** in multiple places (use `experienceRoles/` only)

---

## Examples

### Example 1: Adding a New Company (Yoco)

**Step 1:** Create role file
```markdown
<!-- src/config/experienceRoles/yoco.md -->
---
company: "Yoco"
title: "Senior Product Manager"
timeframe: "2021 - 2023"
engagement_type: "Permanent"
type_location: "Hybrid"
---
```

**Step 2:** Create experience files
```markdown
<!-- src/content/experienceProductStrategist/yoco_product_strategist.md -->
---
roleId: "yoco"
context: "Led B2B merchant tools and payment flows..."
visible: true
---
```

```markdown
<!-- src/content/experienceExecutionLead/yoco_execution_lead.md -->
---
roleId: "yoco"
context: "Shipped 15+ features across mobile and web platforms..."
visible: true
---
```

**Step 3:** Add to ordering
```typescript
// src/config/experienceOrder.ts
export const experienceOrder = {
  productStrategist: {
    "yoco_product_strategist": 1,
    "medici_product_strategist": 2,
  },
  executionLead: {
    "yoco_execution_lead": 1,
    "medici_execution_lead": 2,
  },
};
```

### Example 2: Reordering Profile Tabs

**Goal:** Move "Growth & Behavioural Design" to appear 2nd (after Overview)

```typescript
// src/config/experienceProfiles.ts

// Before
{
  key: 'ProductStrategist',
  order: 2,  // 2nd tab
},
{
  key: 'GrowthAndBD',
  order: 4,  // 4th tab
  visible: false,
}

// After
{
  key: 'GrowthAndBD',
  order: 2,   // ← Changed from 4
  visible: true,  // ← Also made visible
},
{
  key: 'ProductStrategist',
  order: 3,   // ← Changed from 2
}
```

**Result:** Tabs automatically reorder, Growth & BD now appears 2nd

### Example 3: Overview vs Profile-Based Ordering

Same company, different order per profile:

```typescript
// experienceOrder.ts

// Overview: Chronological (newest first)
overview: {
  "medici_overview": 1,                // 2023-2024 (most recent)
  "freelance_overview": 2,             // 2020-present
  "edublox_online_overview": 3,        // 2017-present
},

// Product Strategist: By relevance
productStrategist: {
  "medici_product_strategist": 1,                // Most relevant PM work
  "edublox_online_product_strategist": 2,
  "freelance_product_strategist": 3,
}
```

### Example 4: Hiding a Profile Temporarily

**Goal:** Work on Growth & BD content before making it public

```typescript
// src/config/experienceProfiles.ts
{
  key: 'GrowthAndBD',
  title: 'Growth & Behavioural Design',
  order: 4,
  visible: false,  // ← Tab hidden from users, but files still exist
}
```

**Result:** Tab doesn't appear on experience page, but content is ready to publish by changing `visible: true`

---

## Advanced: Adding a New Profile

**Full checklist for adding a new experience profile:**

### 1. Create Content Folder
```
src/content/experienceNewProfile/
```

### 2. Update `content.config.ts`
```typescript
import { defineCollection, z } from 'astro:content';

const experienceNewProfile = defineCollection({
  type: 'content',
  schema: z.object({
    roleId: z.string(),
    context: z.string().optional(),
    responsibilities: z.string().optional(),
    visible: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

export const collections = {
  // ... existing collections
  experienceNewProfile,
};
```

### 3. Add to `experienceProfiles.ts`
```typescript
{
  key: 'NewProfile',
  title: 'New Profile Name',
  anchor: 'new-profile',
  description: 'Profile description highlighting key focus areas...',
  order_description: 'Roles ordered by relevance, not chronologically.',
  order: 10,
  visible: true,
}
```

### 4. Add to `experienceOrder.ts`
```typescript
export const experienceOrder = {
  // ... existing collections
  newProfile: {
    "medici_new_profile": 1,
    "freelance_new_profile": 2,
  },
};
```

### 5. Update `experience.astro`
```typescript
// Load the collection
const experienceNewProfileExperiences = await getCollection('experienceNewProfile');
const sortedNewProfile = sortExperiencesByOrder(
  experienceNewProfileExperiences,
  'newProfile'
);

// Pass to component
<ExperienceListReact
  // ... existing props
  experienceNewProfileExperiences={sortedNewProfile}
/>
```

### 6. Update `ExperienceListReact.jsx`
```typescript
// Add to props
export default function ExperienceListReact({
  // ... existing props
  experienceNewProfileExperiences,
}) {
  
  // Add to collection mapping
  const experienceCollections = {
    // ... existing collections
    NewProfile: experienceNewProfileExperiences,
  };
}
```

### 7. Create Experience Files
```markdown
<!-- src/content/experienceNewProfile/medici_new_profile.md -->
---
roleId: "medici"
context: "Specific context for this profile..."
visible: true
---
```

---

## File Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `experienceRoles/*.md` | Role metadata (company, title, dates, location) | Adding new company or updating role info |
| `experienceProfiles.ts` | Profile/tab configuration & ordering | Reordering tabs, toggling visibility, updating descriptions |
| `experienceOrder.ts` | Experience display order within profiles | Reordering experiences in any profile |
| `experienceRolesLoader.ts` | Custom loader for roles | Rarely (only if changing role schema) |
| `src/content/experience*/` | Experience content files | Adding new experiences or updating profile-specific content |

---

## Questions?

If you need help with:
- Adding a new collection type
- Changing the default fallback behavior  
- Customizing sorting logic
- Understanding the data flow

**Key Concepts:**
- **Roles** (in `experienceRoles/`) = Single source of truth for company metadata
- **Profiles** (in `experienceProfiles.ts`) = Tab configuration with ordering
- **Experiences** (in `content/experience*/`) = Profile-specific content referencing roles via `roleId`
- **Ordering** (in `experienceOrder.ts`) = Display order within each profile

Edit the helper functions in `experienceOrder.ts` or consult the component files in `src/pages/` and `src/components/`.
