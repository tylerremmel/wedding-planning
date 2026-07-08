// Airtable boolean columns that should unconditionally hide a venue from
// the app, regardless of any user-facing filter/sort selection — venues
// eliminated from consideration shouldn't show up at all. To wire up
// another elimination round later, just add its column name here; nothing
// else needs to change.
const ELIMINATION_FIELDS = ["Eliminated (first round)"];

export function isEliminated(fields) {
  return ELIMINATION_FIELDS.some((field) => Boolean(fields[field]));
}
