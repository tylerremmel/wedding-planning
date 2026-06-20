const PROXY_BASE = "https://airtable-proxy-olive.vercel.app";

function formatProxyError(errorBody) {
  if (errorBody && typeof errorBody === "object") {
    if (typeof errorBody.error === "string") {
      return errorBody.error;
    }

    if (errorBody.error && typeof errorBody.error === "object") {
      return (
        errorBody.error.message ||
        errorBody.error.type ||
        JSON.stringify(errorBody.error)
      );
    }

    return JSON.stringify(errorBody);
  }

  if (typeof errorBody === "string") {
    return errorBody;
  }

  return "Unknown error";
}

function createProxyError(response, errorBody) {
  const message =
    formatProxyError(errorBody) || response.statusText || "Unknown error";
  const error = new Error(message);

  const authFailureMessage =
    /invalid or expired user session token|invalid authentication token/i;
  if (response.status === 401 && authFailureMessage.test(message)) {
    error.isAuthError = true;
  }

  if (
    errorBody &&
    errorBody.details &&
    errorBody.details.error &&
    errorBody.details.error.type === "INVALID_API_VERSION"
  ) {
    error.isAuthError = true;
  }

  if (response.status === 429 || /rate limited/i.test(message)) {
    error.isRateLimit = true;
  }

  return error;
}

async function parseResponseBody(response) {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}

export async function fetchVenueRecords(userToken) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userToken }),
    });

    if (response.ok) {
      return await response.json();
    }

    const errBody = await parseResponseBody(response);
    console.error(
      "Airtable proxy /api/records failed",
      response.status,
      errBody,
    );
    throw createProxyError(response, errBody);
  } catch (error) {
    console.error("Airtable proxy request failed", error);
    throw error;
  }
}

export async function fetchRecordComments(recordId, userToken) {
  try {
    const response = await fetch(
      `${PROXY_BASE}/api/comments?recordId=${recordId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken }),
      },
    );

    if (response.ok) {
      return await response.json();
    }

    const errBody = await parseResponseBody(response);
    const error = createProxyError(response, errBody);
    if (response.status === 429 || error.isRateLimit) {
      error.message =
        "Rate limited. Comments are temporarily unavailable. Please try again later.";
    }
    throw error;
  } catch (err) {
    console.error("Comment fetch failed", err);
    throw err;
  }
}

export async function submitComment(recordId, commentText, userToken) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userToken,
        recordId,
        commentText,
      }),
    });

    if (response.ok) {
      return await response.json();
    }

    const errBody = await parseResponseBody(response);
    const error = createProxyError(response, errBody);
    throw error;
  } catch (err) {
    console.error("Comment submit failed", err);
    throw err;
  }
}

export async function fetchUserProfile(userToken) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userToken }),
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}

export async function submitReaction(recordId, reactionType, userToken) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userToken,
        venueId: recordId,
        type: reactionType,
      }),
    });

    if (response.ok) {
      return await response.json();
    }

    const errBody = await parseResponseBody(response);
    const error = createProxyError(response, errBody);
    throw error;
  } catch (err) {
    console.error("Reaction submit failed", err);
    throw err;
  }
}
