## Context

Enhancement layer on the shipped `sdd-todo-app` vanilla SPA. Existing keys: `todo-app:tasks`, `todo-app:theme`. Tasks currently `{ id, text, completed }`.

## Goals / Non-Goals

**Goals:**

- Categories: fixed presets (`work`, `personal`, `shopping`, `health`, `other`) with color-coded badges
- Due date: optional `<input type="date">` on add; display with `Intl.DateTimeFormat`; overdue class when past due and incomplete
- Filters: segmented control All | Active | Completed; persist selection to `todo-app:filter`
- Animations: CSS `@keyframes`, `transition`, `view-transition` or class-based fade/slide; honor `prefers-reduced-motion`
- Polish: two-row add form, filter bar, improved empty states for filtered views

**Non-Goals:**

- Custom user-defined categories
- Editing tasks in place (category/date edit post-create)
- Calendar views or reminders
- Backend or npm toolchain

## Decisions

### Task model

```js
{ id, text, completed, category: string, dueDate: string | null } // dueDate ISO date YYYY-MM-DD
```

`normalizeTask()` fills `category: 'other'`, `dueDate: null` for legacy entries.

### Filter logic

- `filter`: `'all' | 'active' | 'completed'`
- `getVisibleTasks()` applies filter before render
- Count subtitle reflects **visible** active tasks when filter is active, or global remaining when `all`

### Filter UI

- `role="tablist"` on container; buttons `role="tab"` with `aria-selected`
- Keyboard: arrow keys optional enhancement; click + focus sufficient for MVP

### Category styling

- CSS classes `.task-item__category--{id}` mapping to `--cat-work`, etc.

### Animations

- `.task-item--enter` on new items; `.task-item--leaving` before remove (short timeout then DOM remove)
- Filter change: `.task-list--fade` brief opacity transition
- Reduced motion: disable animations, instant updates

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Larger localStorage payload | Dates/categories are small strings |
| Filter + empty state confusion | Separate copy for "no tasks match filter" |
| Date timezone edge cases | Store date-only strings; compare at local midnight |

## Migration Plan

Deploy as file update. On load, map old tasks through `normalizeTask()`. No rollback beyond git revert.

## Open Questions

_None._
