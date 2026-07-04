// "All reactions" is a comma-separated "email|type" string (see
// VenueCard's deriveActiveReactions). This only checks presence of any
// reaction from `userEmail`, so it doesn't need the legacy field
// fallbacks that function carries for records without per-user
// attribution — those records can't answer "did I react" at all.
export function hasUserReacted(fields, userEmail) {
  if (!userEmail) return false;
  const allReactions = fields["All reactions"];
  if (!allReactions || typeof allReactions !== "string") return false;
  return allReactions.split(",").some((entry) => {
    const pipeIdx = entry.indexOf("|");
    if (pipeIdx === -1) return false;
    return entry.slice(0, pipeIdx).trim() === userEmail;
  });
}
