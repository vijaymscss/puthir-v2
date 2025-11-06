# Architecture Documentation

**Last Updated**: November 6, 2025  
**Status**: ✅ Production Ready  
**Build Status**: ✅ Passing

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture Principles](#architecture-principles)
3. [Folder Structure](#folder-structure)
4. [Feature Modules](#feature-modules)
5. [Import Patterns](#import-patterns)
6. [Best Practices](#best-practices)
7. [Migration Guide](#migration-guide)

---

## Overview

This application uses a **feature-based architecture** that organizes code by business domain rather than by technical layer. This approach provides:

- ✅ **Better Scalability**: Add new features without affecting existing ones
- ✅ **Clear Boundaries**: Easy to understand what belongs where
- ✅ **Team Collaboration**: Multiple developers can work independently
- ✅ **Code Discoverability**: Find related code in one place
- ✅ **Maintainability**: Isolated features are easier to test and modify

---

## Architecture Principles

### 1. Feature-First Organization
Code is organized by **feature/domain** (quiz, exam, auth) rather than by type (components, hooks, services).

### 2. Clear Separation of Concerns
- **Features**: Domain-specific logic and UI
- **Shared**: Reusable across features (UI components, utilities)
- **Core**: Infrastructure (database, middleware, providers)

### 3. Explicit Dependencies
Features import from shared/core, but shared/core never imports from features.

### 4. Index Files for Clean Exports
Each module has index.ts files for better import paths.

---

## Folder Structure

```
src/
├── core/                          # Core infrastructure
│   ├── config/                    # App configuration
│   │   ├── prisma.ts              # Prisma client
│   │   ├── database.ts            # Database utilities
│   │   └── index.ts               # Exports
│   ├── middleware/
│   │   └── middleware.ts          # Auth & routing middleware
│   └── providers/
│       ├── query-provider.tsx     # React Query provider
│       └── index.ts
│
├── shared/                        # Shared across features
│   ├── components/
│   │   ├── layout/                # Navbar, LayoutShell, ScrollToTop
│   │   ├── theme/                 # ThemeProvider, ThemeToggle
│   │   ├── providers/             # ClerkProviderClient
│   │   └── ui/                    # shadcn/ui components (button, card, etc.)
│   ├── lib/
│   │   ├── utils.ts               # cn() and utilities
│   │   └── index.ts
│   ├── types/
│   │   ├── api.ts                 # API response types
│   │   └── index.ts
│   └── config/
│       └── api.ts                 # API configuration
│
├── features/                      # Feature modules
│   ├── quiz/                      # Main quiz feature
│   │   ├── components/            # QuestionCard, QuizHeader, QuizLoader, etc.
│   │   │   └── index.ts
│   │   ├── hooks/                 # use-quiz-state, use-quiz-logic, use-quiz
│   │   │   └── index.ts
│   │   ├── services/              # quiz-service.ts, api.ts
│   │   │   └── index.ts
│   │   ├── validations/           # quiz.ts (zod schemas)
│   │   └── types/                 # QuizData, QuizQuestion types
│   │
│   ├── exam/                      # Exam management
│   │   ├── components/            # ExamDetailsModal
│   │   │   └── index.ts
│   │   ├── constants/             # examTopics.ts, examTopicMappings.ts
│   │   │   └── index.ts
│   │   ├── services/              # Exam-related API calls
│   │   └── types/                 # ExamType, CloudPlatform types
│   │
│   ├── quiz-setup/                # Quiz configuration
│   │   ├── components/
│   │   ├── pages/                 # quiz-setup pages
│   │   └── types/
│   │
│   ├── free-test/                 # Demo/free test
│   │   ├── components/
│   │   ├── constants/             # demoQuestions.ts
│   │   │   └── index.ts
│   │   └── pages/
│   │
│   ├── auth/                      # Authentication
│   │   ├── components/            # CustomSignIn, CustomSignUp
│   │   │   └── index.ts
│   │   └── pages/
│   │
│   ├── contact/                   # Contact feature
│   │   ├── components/            # ContactForm
│   │   ├── content/               # contact.content.ts
│   │   ├── services/              # contact.ts
│   │   ├── validations/           # contact.ts
│   │   ├── hooks/                 # use-contact
│   │   └── pages/
│   │
│   ├── about/                     # About feature
│   │   ├── content/               # about.content.ts
│   │   └── pages/
│   │
│   └── home/                      # Home/landing
│       ├── components/            # AnimatedBackground, Btn
│       └── pages/
│
└── app/                           # Next.js app directory (routes only)
    ├── layout.tsx                 # Root layout
    ├── page.tsx                   # Home page (imports from features/home)
    ├── globals.css                # Global styles
    ├── quiz/                      # Quiz routes
    ├── exam/                      # Exam routes
    ├── free-test/                 # Free test routes
    └── api/                       # API routes (stay here)
        ├── generate-quiz/
        ├── exam-history/
        ├── exam-stats/
        ├── contact/
        └── users/
```

---

## Feature Modules

### Quiz Feature (`features/quiz/`)
**Purpose**: Core quiz functionality including question display, navigation, and results

**Key Files**:
- `components/`: QuizLoader, QuizHeader, QuestionCard, QuizNavigation, QuestionNavigator
- `hooks/`: use-quiz-state (state management), use-quiz-logic (business logic), use-quiz (React Query)
- `services/`: quiz-service.ts (quiz generation), api.ts (API calls)
- `validations/`: quiz.ts (zod schemas for quiz data)

**Import Example**:
```typescript
import { QuizHeader, QuestionCard } from '@/features/quiz/components';
import { useQuizState, useQuizLogic } from '@/features/quiz/hooks';
```

### Exam Feature (`features/exam/`)
**Purpose**: Exam catalog, topic selection, and exam history

**Key Files**:
- `components/`: ExamDetailsModal
- `constants/`: examTopics.ts (exam data), examTopicMappings.ts (topic mappings)

**Import Example**:
```typescript
import { examTopics, getExamTopics } from '@/features/exam/constants';
import { ExamDetailsModal } from '@/features/exam/components';
```

### Free Test Feature (`features/free-test/`)
**Purpose**: Demo/free quiz functionality with pre-loaded questions

**Key Files**:
- `constants/`: demoQuestions.ts (140 demo questions for 7 certifications)

**Import Example**:
```typescript
import { getDemoQuestions, getDemoCertifications } from '@/features/free-test/constants';
```

### Auth Feature (`features/auth/`)
**Purpose**: User authentication and authorization

**Key Files**:
- `components/`: CustomSignIn, CustomSignUp

**Import Example**:
```typescript
import { CustomSignIn } from '@/features/auth/components';
```

### Contact Feature (`features/contact/`)
**Purpose**: Contact form and communication

**Key Files**:
- `components/`: ContactForm
- `hooks/`: use-contact
- `services/`: contact.ts (contact API service)
- `validations/`: contact.ts (contact form schema)

**Import Example**:
```typescript
import { ContactForm } from '@/features/contact/components';
import { useContactForm } from '@/features/contact/hooks';
```

---

## Import Patterns

### TypeScript Path Aliases

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/features/*": ["./src/features/*"],
    "@/core/*": ["./src/core/*"],
    "@/shared/*": ["./src/shared/*"]
  }
}
```

### Import Hierarchy

```
✅ ALLOWED:
features → shared     (Features can import from shared)
features → core       (Features can import from core)
shared → core         (Shared can import from core)
app → features        (App pages import from features)
app → shared          (App pages import from shared)
app → core            (App pages import from core)

❌ NOT ALLOWED:
shared → features     (Shared cannot import from features)
core → features       (Core cannot import from features)
core → shared         (Core cannot import from shared)
```

### Example Imports

```typescript
// ✅ Good: Using index exports
import { QuizHeader, QuestionCard } from '@/features/quiz/components';
import { Button, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

// ✅ Good: Direct imports when needed
import { examTopics } from '@/features/exam/constants/examTopics';
import { prisma } from '@/core/config/prisma';

// ❌ Bad: Relative imports across features
import { QuizHeader } from '../../../features/quiz/components/QuizHeader';

// ❌ Bad: Shared importing from features
// In shared/components/Layout.tsx
import { QuizHeader } from '@/features/quiz/components'; // ❌ Don't do this
```

---

## Best Practices

### 1. Feature Module Structure

Each feature should have a consistent structure:

```
features/[feature-name]/
├── components/           # UI components
│   └── index.ts          # Export all components
├── hooks/                # Custom hooks
│   └── index.ts
├── services/             # API calls & business logic
│   └── index.ts
├── validations/          # Zod schemas
├── types/                # TypeScript types
├── constants/            # Feature constants
└── pages/                # Page-level components (if needed)
```

### 2. Index Files

Always create index.ts files for clean exports:

```typescript
// features/quiz/components/index.ts
export { QuizLoader } from './QuizLoader';
export { QuizHeader } from './QuizHeader';
export { QuestionCard } from './QuestionCard';
```

### 3. Component Organization

- **Shared Components**: Truly reusable UI (buttons, cards, dialogs)
- **Feature Components**: Domain-specific (QuizHeader, ExamDetailsModal)
- **Layout Components**: App-wide layout (Navbar, LayoutShell)

### 4. State Management

- **Local State**: useState for component-specific state
- **Custom Hooks**: useQuizState for feature-specific state
- **React Query**: useQuiz for server state
- **Session Storage**: Quiz data persistence

### 5. Service Layer

Keep API calls centralized:

```typescript
// features/quiz/services/api.ts
export const quizApi = {
  generateQuiz: (request: QuizRequest) => apiCall('/api/generate-quiz', { ... }),
  submitQuiz: (result: QuizResult) => apiCall('/api/exam-history', { ... }),
};
```

### 6. Type Safety

Define types in feature-specific type files:

```typescript
// features/quiz/types/index.ts
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
}
```

---

## Migration Guide

### Adding a New Feature

1. **Create Feature Directory**:
```bash
mkdir -p src/features/[feature-name]/{components,hooks,services,types}
```

2. **Add Index Files**:
```typescript
// src/features/[feature-name]/components/index.ts
export { MyComponent } from './MyComponent';
```

3. **Update TypeScript Paths** (if needed):
```json
// tsconfig.json already has wildcard paths
"@/features/*": ["./src/features/*"]
```

4. **Follow Feature Structure**:
- Components → UI elements
- Hooks → React hooks
- Services → API & business logic
- Types → TypeScript interfaces
- Validations → Zod schemas

### Refactoring Existing Code

1. **Identify the Feature Domain**: Determine which feature the code belongs to
2. **Move Files**: Copy files to the new feature directory
3. **Update Imports**: Change imports to use new paths
4. **Test**: Run build and verify no errors
5. **Delete Old Files**: Remove original files after verification

### Example: Moving a Component

```bash
# Before
src/components/MyComponent.tsx

# After
src/features/[feature]/components/MyComponent.tsx

# Update imports in all files using it
- import { MyComponent } from '@/components/MyComponent';
+ import { MyComponent } from '@/features/[feature]/components';
```

---

## Metrics & Benefits

### Code Organization
- **156 TypeScript/TSX files** organized into logical features
- **Zero circular dependencies** with clear import hierarchy
- **100% type safety** with TypeScript strict mode

### Build Performance
- ✅ **Successful build** with no errors
- ✅ **Fast compilation** (~4.2s)
- ✅ **Tree-shaking optimized** with feature-based modules

### Developer Experience
- 🎯 **Easy to find code**: Related files are grouped together
- 🎯 **Clear boundaries**: Know exactly where code belongs
- 🎯 **Scalable**: Add features without touching existing code
- 🎯 **Testable**: Features can be tested in isolation

---

## Questions & Support

### Common Questions

**Q: Can a feature import from another feature?**  
A: Generally no. If you need to share code between features, move it to `shared/`. However, in rare cases where one feature is a true dependency of another, it's acceptable.

**Q: Where do API routes go?**  
A: API routes stay in `src/app/api/` as required by Next.js.

**Q: Can I use relative imports within a feature?**  
A: Yes, within the same feature module, relative imports are fine. But prefer absolute imports for clarity.

**Q: How do I add a new shared component?**  
A: Add it to `shared/components/ui/` and export it from the appropriate index file.

---

## Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Status**: ✅ Architecture fully implemented and production-ready  
**Last Build**: November 6, 2025  
**TypeScript Errors**: 0  
**Build Time**: ~4.2s
