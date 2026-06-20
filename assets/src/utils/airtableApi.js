const PROXY_BASE = "https://airtable-proxy-olive.vercel.app";

export async function fetchVenueRecords(userToken) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userToken }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      let errBody;
      try {
        errBody = await response.json();
      } catch (parseError) {
        errBody = await response.text();
      }
      console.error(
        "Airtable proxy /api/records failed",
        response.status,
        errBody,
      );
      const message =
        errBody?.error ||
        response.statusText ||
        (typeof errBody === "string" ? errBody : "Unknown error");
      throw new Error(`Data Error: ${message}`);
    }
  } catch (error) {
    console.error("Airtable proxy request failed", error);
    throw new Error("Connection dropped.");
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
    } else if (response.status === 429) {
      throw new Error(
        "Rate limited. Comments are temporarily unavailable. Please try again later.",
      );
    } else {
      throw new Error("Comments unavailable.");
    }
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
    } else {
      const resData = await response.json();
      throw new Error(`Blocked: ${resData.error || response.statusText}`);
    }
  } catch (err) {
    console.error("Comment submit failed", err);
    throw err;
  }
}
