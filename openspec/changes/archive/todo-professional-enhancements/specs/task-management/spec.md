## MODIFIED Requirements

### Requirement: User can add a task

The system SHALL allow the user to add a new task with text, optional category, and optional due date through the add-task form.

#### Scenario: Add task via submit button

- **WHEN** the user enters text, optionally selects category and due date, and activates the add control
- **THEN** a new active task appears in the task list with the chosen metadata

#### Scenario: Add task via Enter key

- **WHEN** the user submits the form with Enter
- **THEN** a new active task is created and the text input is cleared

#### Scenario: Reject empty task

- **WHEN** the user submits with only whitespace in the text input
- **THEN** no new task is added

### Requirement: Task list reflects current state

The system SHALL display tasks according to the active filter and show context-appropriate empty states.

#### Scenario: Empty list message

- **WHEN** there are zero tasks in storage
- **THEN** the UI shows the primary empty-state message

#### Scenario: Task count summary

- **WHEN** the task list or filter changes
- **THEN** the UI updates the remaining-task summary in the live region
