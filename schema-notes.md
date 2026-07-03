# Schema Notes

## Why UUID instead of auto-incrementing integers?

- UUIDs are unique, so they work well even if data comes from different systems.
- They are also harder for users to guess than sequential numbers.

## Why TIMESTAMPTZ instead of TIMESTAMP?

- TIMESTAMPTZ stores the date and time together with the time zone.
- This makes it easier to work with users in different locations and avoids time zone problems.

## What does CHECK (status IN (...)) do?

- The CHECK constraint only allows valid status values like `new`, `contacted`, `qualified`, and `closed`.
- It prevents invalid data from being saved in the database.

## Why ON DELETE CASCADE on conversations.lead_id and messages.lead_id?

- If a lead is deleted, all related conversations and messages are deleted automatically.
- This keeps the database clean and avoids orphan records.
