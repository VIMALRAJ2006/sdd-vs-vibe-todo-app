## MODIFIED Requirements

### Requirement: Semantic structure and labels

The system SHALL provide accessible names for category, due date, and filter controls.

#### Scenario: Category selector labeled

- **WHEN** assistive technology encounters the category field
- **THEN** it has an associated visible or visually hidden label

#### Scenario: Due date labeled

- **WHEN** assistive technology encounters the due date field
- **THEN** it has an accessible name describing its purpose

### Requirement: Filter controls are accessible

The system SHALL implement filters as an accessible tablist or equivalent single-selection pattern.

#### Scenario: Filter selection announced

- **WHEN** the user selects a filter tab
- **THEN** the control exposes `aria-selected` (or equivalent) reflecting the active filter

### Requirement: Responsive layout

The system SHALL keep the enhanced form and filter bar usable on narrow viewports.

#### Scenario: Mobile layout

- **WHEN** viewport width is phone-sized
- **THEN** add form fields stack or wrap without horizontal overflow and controls remain at least ~44px touch height where feasible
