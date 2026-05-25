## ADDED Requirements

### Requirement: User can set an optional due date when adding a task

The system SHALL provide an optional due date field on the add-task form.

#### Scenario: Add task with due date

- **WHEN** the user sets a due date and submits a valid task
- **THEN** the task stores the date and displays it in a human-readable format on the task row

#### Scenario: Add task without due date

- **WHEN** the user leaves the due date empty and submits
- **THEN** the task is created with no due date shown

### Requirement: Overdue tasks are visually indicated

The system SHALL highlight incomplete tasks whose due date is before today.

#### Scenario: Overdue active task

- **WHEN** an incomplete task has a due date before the current local date
- **THEN** the due date display uses overdue styling

#### Scenario: Completed overdue task

- **WHEN** a completed task is past its due date
- **THEN** overdue emphasis is not applied (or is subdued per design)
