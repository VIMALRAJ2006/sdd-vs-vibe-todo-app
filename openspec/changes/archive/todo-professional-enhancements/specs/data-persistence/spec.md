## MODIFIED Requirements

### Requirement: Tasks persist across sessions

The system SHALL save the full task model (including category and due date) to `localStorage` and restore on load with migration for legacy shapes.

#### Scenario: Restore enhanced tasks on reload

- **WHEN** the user reloads after adding tasks with category and due date
- **THEN** the same metadata is restored

#### Scenario: Migrate legacy task shape

- **WHEN** stored tasks lack category or dueDate fields
- **THEN** defaults are applied on load without discarding tasks

### Requirement: Filter preference persists

The system SHALL persist the active status filter to `localStorage` key `todo-app:filter`.

#### Scenario: Restore filter

- **WHEN** the user returns with a saved filter preference
- **THEN** that filter is applied on initialization
