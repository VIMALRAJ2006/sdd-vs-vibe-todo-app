## ADDED Requirements

### Requirement: User can assign a category when adding a task

The system SHALL provide a category selector on the add-task form with predefined options.

#### Scenario: Add task with category

- **WHEN** the user selects a category and submits a valid task
- **THEN** the new task stores that category and displays a visible category badge on the task row

#### Scenario: Default category for legacy tasks

- **WHEN** a stored task has no category field
- **THEN** the system treats it as the default category without data loss

### Requirement: Categories are visually distinct

The system SHALL style each category badge with a distinguishable color or label treatment.

#### Scenario: Category badge visible

- **WHEN** a task is rendered
- **THEN** its category badge shows the category name and uses category-specific styling
