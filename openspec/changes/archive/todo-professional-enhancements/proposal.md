## Why

The base todo app covers core CRUD and persistence but lacks organization features users expect in a professional task tool. Categories, due dates, and filtering improve usability; polished motion and layout raise perceived quality without abandoning the lightweight static stack.

## What Changes

- Add optional **task categories** (preset list) when creating tasks; display category badges on each item
- Add optional **due dates** on tasks with human-readable display and overdue emphasis
- Add **filter controls**: All, Active, Completed (updates visible list, preserves full data)
- Enhance **animations**: list item enter/exit, filter transitions, micro-interactions (respect `prefers-reduced-motion`)
- **UI polish**: refined add form, filter bar, category colors, spacing, empty/filtered states
- Extend persistence schema with backward-compatible migration for existing stored tasks
- Maintain accessibility (keyboard, ARIA, focus) and responsive layout

## Capabilities

### New Capabilities

- `task-categories`: Assign and display category on tasks
- `task-due-dates`: Optional due date on create; formatted display and overdue styling
- `task-filters`: Filter visible tasks by All / Active / Completed
- `ui-motion`: Smooth CSS transitions and list animations with reduced-motion fallback

### Modified Capabilities

- `task-management`: Extended task model and add form fields
- `data-persistence`: Migration for legacy tasks; persist filter preference
- `accessible-ui`: Filter toolbar as accessible tab pattern; labeled category and date inputs

## Impact

- Files: `index.html`, `styles.css`, `app.js`
- `localStorage`: extended task objects; optional `todo-app:filter` key
- No breaking API; legacy tasks gain default category and no due date
