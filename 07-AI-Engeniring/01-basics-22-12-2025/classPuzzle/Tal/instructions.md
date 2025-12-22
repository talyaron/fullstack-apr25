

The Claude Code Prompt
Markdown

# Act as a Senior Full-Stack Architect: Space-Themed Task Management App

Build a production-grade, full-stack Task Management application using the MERN stack with strict TypeScript.

## Technical Stack & Architecture
- **Frontend:** React 18 (Vite), TypeScript, Tailwind CSS.
- **State Management:** Redux Toolkit (RTK) & RTK Query for data fetching/caching.
- **Backend:** Node.js, Express, TypeScript.
- **Database:** MongoDB via Mongoose.
- **Validation:** Valibot (used for API request validation and frontend form validation).
- **Project Structure:** Monorepo-style with a `shared` directory for types and Valibot schemas to ensure full-stack type safety.

## Required Logic & Schema
You MUST implement a shared schema for "Results Settings" and use it within the Task model.

```typescript
import { object, enum_, number, optional, InferOutput } from 'valibot';

export enum ResultsBy { DATE = 'date', PRIORITY = 'priority', CONSENSUS = 'consensus' }
export enum CutoffBy { COUNT = 'count', PERCENTAGE = 'percentage' }

export const ResultsSettingsSchema = object({
   resultsBy: enum_(ResultsBy),
   cutoffNumber: optional(number()),
   cutoffBy: optional(enum_(CutoffBy)),
   numberOfResults: optional(number()),
   numberOfSelections: optional(number()),
   deep: optional(number()),
   minConsensus: optional(number()),
});

export type ResultsSettings = InferOutput<typeof ResultsSettingsSchema>;
Core Features
Authentication: - Username and password registration/login.

Secure JWT implementation (HttpOnly cookies preferred).

Client-side protected routes.

Task Management: - Full CRUD functionality.

Integration of ResultsSettings into the task creation and display logic.

Theming & UI:

"Galactic/Space" aesthetic.

Toggleable Dark and Light themes.

Use Glassmorphism (blur effects), glowing borders, and cosmic gradients (e.g., Deep Indigo to Obsidian).

Responsive design using Tailwind.

Engineering Standards
Validation Middleware: Create a reusable Express middleware to validate req.body and req.params using Valibot schemas.

Strict Typing: No any. Use discriminated unions for state where appropriate.

RTK Query: Implement centralized API slices with tag-based cache invalidation.

Error Handling: Centralized backend error handler and frontend Error Boundaries.

Clean Code: Adhere to SOLID principles and DRY. Modularize components and hooks.

Initialization Instructions
Scaffold the project into client, server, and shared folders.

Set up the TypeScript configuration for each, ensuring the client/server can import from the shared directory.

Implement the Auth system first, followed by the Task CRUD logic.

Finalize with the Space-themed UI and theme provider.

Proceed with the initial project structure.


---

### Key Implementation Notes for this Build:

* **Monorepo Strategy:** Since you are using a shared Valibot schema, Claude will likely suggest using a simple workspace or relative imports. This is the "gold standard" for preventing runtime errors between your frontend and backend.
* **Space Aesthetic:** I've instructed the AI to use **Glassmorphism**. For a galactic feel, this usually involves:
    * `backdrop-blur-md` on cards.
    * Semi-transparent backgrounds (`bg-white/10` or `bg-slate-900/50`).
    * Subtle "stellar" box-shadows (using accent colors like Cyan or Purple).
* **RTK Query:** By using RTK Query instead of standard `useEffect` hooks, the app will handle "Loading" and "Error" states automatically, making the UX much smoother.

**Would you like me to generate a specific file structure or the Express validation middleware for Valibot to get you started?**