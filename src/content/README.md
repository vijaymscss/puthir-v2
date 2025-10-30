# Content Localization Structure

This directory contains content files organized for internationalization (i18n).

## Current Implementation

### About Page Content
- **File**: `about.content.ts`
- **Language**: English (default)
- All text content is externalized and ready for translation
- **Icons**: Uses Lucide React icon names (string references, not emojis)

### Contact Page Content
- **File**: `contact.content.ts`
- **Language**: English (default)
- Includes FAQ items, email support info, and CTA content
- **Icons**: Uses Lucide React icon names for visual elements

## Icon System

The content uses **Lucide React** icons by their component names:
- Icons are referenced as strings (e.g., `"Target"`, `"Zap"`, `"Bot"`)
- The page components map these strings to actual icon components
- This approach keeps icons consistent and scalable across translations

### Available Icon Names
Common icons used:

**About Page:**
- `Target`, `Zap`, `Star` - for highlights
- `Bot`, `BarChart3`, `FileText` - for features
- `Navigation`, `BookOpen`, `Settings` - for tools
- `Wrench`, `Atom`, `Shield` - for tech stack
- `Rocket`, `ArrowLeft` - for CTAs

**Contact Page:**
- `Mail`, `Clock` - for support info
- `HelpCircle`, `ChevronDown` - for FAQ
- `Bot`, `Globe`, `Trophy` - for FAQ items
- `Smartphone`, `RefreshCw`, `DollarSign` - for features

See [Lucide Icons](https://lucide.dev/icons) for full list.

## How to Add a New Language

### Step 1: Create a New Content File
Copy the existing content file and translate all values:

```bash
# Example for Spanish
cp about.content.ts about.content.es.ts

# Example for French
cp about.content.ts about.content.fr.ts
```

### Step 2: Translate Content
Open your new file (e.g., `about.content.es.ts`) and translate all text values while keeping the structure identical:

```typescript
export const aboutContent = {
  hero: {
    title: "Acerca de Cloud Practice Test",
    subtitle: "Domina las certificaciones en la nube...",
  },
  // ... translate all sections
};
```

### Step 3: Create a Language Selector
Create a helper file to select content based on locale:

```typescript
// Example: src/lib/i18n.ts
import { aboutContent as aboutContentEn } from "@/content/about.content";
import { aboutContent as aboutContentEs } from "@/content/about.content.es";

export function getAboutContent(locale: string) {
  switch (locale) {
    case 'es':
      return aboutContentEs;
    case 'en':
    default:
      return aboutContentEn;
  }
}
```

### Step 4: Update Page to Use Locale
Modify the page to accept and use locale parameter:

```typescript
import { getAboutContent } from "@/lib/i18n";

export default function AboutPage({ params }: { params: { locale?: string } }) {
  const aboutContent = getAboutContent(params.locale || 'en');
  // ... rest of component
}
```

## Content Structure

Each content file follows this structure:

- `hero`: Hero section (title, subtitle)
- `mission`: Mission statement (icon, title, paragraphs[])
- `features`: Platform features list (icon, title, items[])
- `technology`: Technology stack (icon, title, stack[])
- `whyChoose`: Benefits section (icon, title, reasons[])
- `cta`: Call-to-action (title, description, buttons)

## Supported Languages (Planned)

- [x] English (en) - Default
- [ ] Spanish (es)
- [ ] French (fr)
- [ ] German (de)
- [ ] Japanese (ja)
- [ ] Chinese Simplified (zh-CN)

## Best Practices

1. **Keep Structure Identical**: All translated files must have the same structure
2. **Preserve Formatting**: Maintain HTML tags and formatting in translations
3. **Cultural Adaptation**: Adapt examples and references for local audiences
4. **Icon Consistency**: Keep emojis/icons unless culturally inappropriate
5. **Test Thoroughly**: Verify layout doesn't break with longer translations

## Type Safety

The content structure is typed using TypeScript. When creating new translations, use the exported type:

```typescript
import type { AboutContent } from "./about.content";

export const aboutContent: AboutContent = {
  // ... your translated content
};
```

This ensures all translations have the same shape as the English version.
