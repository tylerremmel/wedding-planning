const VALID_REACTION_TYPES = new Set(["heart", "thumbs_up", "thumbs_down"]);

export function parseReactionEntries(allReactions) {
  if (!allReactions || typeof allReactions !== "string") return [];

  return allReactions
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const pipeIdx = entry.indexOf("|");
      if (pipeIdx === -1) return null;
      const email = entry.slice(0, pipeIdx).trim();
      const type = entry.slice(pipeIdx + 1).trim();
      return email && type ? { email, type } : null;
    })
    .filter(Boolean);
}

export function getUserReactionTypes(fields, userEmail) {
  if (!userEmail) return new Set();

  const active = new Set();
  parseReactionEntries(fields["All reactions"]).forEach(({ email, type }) => {
    if (email === userEmail && VALID_REACTION_TYPES.has(type)) {
      active.add(type);
    }
  });
  return active;
}

// "All reactions" is a comma-separated "email|type" string (see
// VenueCard's deriveActiveReactions). This only checks presence of any
// reaction from `userEmail`, so it doesn't need the legacy field
// fallbacks that function carries for records without per-user
// attribution — those records can't answer "did I react" at all.
export function hasUserReacted(fields, userEmail) {
  if (!userEmail) return false;
  return parseReactionEntries(fields["All reactions"]).some(
    ({ email }) => email === userEmail,
  );
}

export function toggleUserReaction(
  allReactions,
  userEmail,
  reactionType,
  active,
) {
  if (!userEmail || !reactionType) return allReactions ?? "";

  const entries = parseReactionEntries(allReactions);
  const nextEntries = entries.filter(
    ({ email, type }) => !(email === userEmail && type === reactionType),
  );

  if (active) {
    nextEntries.push({ email: userEmail, type: reactionType });
  }

  return nextEntries.map(({ email, type }) => `${email}|${type}`).join(",");
}
