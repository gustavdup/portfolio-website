# Experience Profile Visibility Guide

## Overview
You can now hide/show individual experience profiles by adding a `visible` field to the frontmatter of any experience markdown file.

## How to Hide Experience Profiles

### Step 1: Add `visible: false` to any experience file frontmatter

```markdown
---
company: "Company Name"
title: "Job Title"
timeframe: "Date Range"
visible: false  # ← Add this line to hide the profile
order: 1
context: ["context", "tags"]
responsibilities:
  - "Responsibility 1"
  - "Responsibility 2"
---
```

### Step 2: The profile will be automatically hidden from the experience page

When `visible: false`, the experience profile will not appear on the `/experience` page.

## Default Behavior

- If you don't specify `visible`, it defaults to `true` (visible)
- If you set `visible: true`, the profile will be shown
- If you set `visible: false`, the profile will be hidden
- **If ALL profiles in a category are hidden (`visible: false`), the entire pill/tab for that category will be automatically hidden**

## Smart Pill/Tab Hiding

The experience page automatically hides pills/tabs for categories that have no visible experiences:

- If you hide all "Product Strategist" experiences, the "Product Strategist" pill disappears
- If you hide all "Execution Lead" experiences, the "Execution Lead" pill disappears
- The page will automatically select the first available category with visible experiences
- If you bookmark a URL with a hidden category, it will redirect to the first visible category

## Experience Collections That Support Visibility

All experience collections now support the `visible` field:

- `experienceProductStrategist/`
- `experienceExecutionLead/`
- `experienceDigitalEnabler/`
- `experienceFractionalPm/`
- `experienceCollaborativeLeader/`
- `experienceCommercialStrategist/`
- `experienceStrategicTechnologist/`

## Example: Creating Profiles One by One

### Phase 1: Hide entire categories while building them
```markdown
# Hide all Fractional PM profiles while working on them
# File: experienceFractionalPm/company-a.md
---
company: "Company A"
title: "Fractional PM"
visible: false  # ← Hide this profile
---

# File: experienceFractionalPm/company-b.md  
---
company: "Company B"
title: "Senior Fractional PM"
visible: false  # ← Hide this profile too
---

# Result: The "Fractional PM" pill/tab will disappear entirely from the experience page
```

### Phase 2: Show individual profiles as you complete them
```markdown
# File: experienceFractionalPm/company-a.md
---
company: "Company A"
title: "Fractional PM"
visible: true  # ← Show this one now
---

# File: experienceFractionalPm/company-b.md  
---
company: "Company B"
title: "Senior Fractional PM"
visible: false  # ← Keep this one hidden
---

# Result: The "Fractional PM" pill/tab reappears with 1 visible profile
```

### Phase 3: Complete the category
```markdown
# File: experienceFractionalPm/company-b.md  
---
company: "Company B"
title: "Senior Fractional PM"
visible: true  # ← Show this one too
---

# Result: The "Fractional PM" pill/tab shows all profiles (2 total)
```

## Tips

1. **Work in Progress**: Set `visible: false` for profiles you're still writing
2. **Testing**: Hide profiles temporarily to test the page layout
3. **Selective Display**: Show only your most relevant experiences for specific audiences
4. **No File Deletion**: Keep all files but control what's displayed

## Current Status

Your experience page will now only show profiles where `visible` is not `false`. All existing profiles without a `visible` field will continue to show (defaults to `true`).
