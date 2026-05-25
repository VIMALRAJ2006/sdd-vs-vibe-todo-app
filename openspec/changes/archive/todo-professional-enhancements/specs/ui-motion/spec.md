## ADDED Requirements

### Requirement: Task list uses smooth motion

The system SHALL animate task entry and meaningful state changes using CSS transitions or animations.

#### Scenario: New task appears with motion

- **WHEN** a task is added
- **THEN** the new row animates into view unless reduced motion is preferred

#### Scenario: Filter change transitions

- **WHEN** the user changes the status filter
- **THEN** the list updates with a brief visual transition

### Requirement: Reduced motion is respected

The system SHALL disable or minimize non-essential animations when the user prefers reduced motion.

#### Scenario: Prefers reduced motion

- **WHEN** `prefers-reduced-motion: reduce` applies
- **THEN** task and filter animations are suppressed or instant
