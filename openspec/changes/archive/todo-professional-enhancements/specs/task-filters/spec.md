## ADDED Requirements

### Requirement: User can filter tasks by status

The system SHALL provide filter controls for All, Active, and Completed tasks.

#### Scenario: Show all tasks

- **WHEN** the user selects the All filter
- **THEN** every task is eligible to appear in the list

#### Scenario: Show active tasks only

- **WHEN** the user selects the Active filter
- **THEN** only incomplete tasks appear in the list

#### Scenario: Show completed tasks only

- **WHEN** the user selects the Completed filter
- **THEN** only completed tasks appear in the list

### Requirement: Filter preference persists

The system SHALL save the selected filter to `localStorage` and restore it on load.

#### Scenario: Restore filter on reload

- **WHEN** the user reloads after choosing the Completed filter
- **THEN** the Completed filter remains selected

### Requirement: Filtered empty state

The system SHALL show appropriate messaging when no tasks match the current filter.

#### Scenario: No active tasks under Active filter

- **WHEN** the Active filter is selected and all tasks are completed
- **THEN** the UI shows a message indicating no active tasks match the filter
