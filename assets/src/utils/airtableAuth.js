const CLIENT_ID = "5cf62d42-4eab-4c8c-9509-5aba4e28c22d";
const PROXY_BASE = "https://airtable-proxy-olive.vercel.app";

export function getRedirectUri() {
  return window.location.origin + window.location.pathname;
}

export function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

export async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function redirectToAirtableOAuth() {
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);

  localStorage.setItem("oauth_state", state);
  localStorage.setItem("oauth_code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const scopes =
    "user.email:read data.records:read data.records:write data.recordComments:read data.recordComments:write";

  const targetQuery = new URLSearchParams();
  targetQuery.append("response_type", "code");
  targetQuery.append("client_id", CLIENT_ID);
  targetQuery.append("redirect_uri", getRedirectUri());
  targetQuery.append("scope", scopes);
  targetQuery.append("state", state);
  targetQuery.append("code_challenge", codeChallenge);
  targetQuery.append("code_challenge_method", "S256");

  const authUrl = `https://airtable.com/oauth2/v1/authorize?${targetQuery.toString()}`;
  console.debug("Airtable OAuth redirect", {
    authUrl,
    state,
    redirectUri: getRedirectUri(),
  });
  window.location.href = authUrl;
}

export async function exchangeCodeForToken(code) {
  try {
    const response = await fetch(`${PROXY_BASE}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        redirectUri: getRedirectUri(),
        codeVerifier: localStorage.getItem("oauth_code_verifier"),
      }),
    });

    if (response.ok) {
      const tokenData = await response.json();
      localStorage.setItem("airtable_user_token", tokenData.access_token);
      localStorage.setItem("user_email", "Verified User");
      window.location.reload();
    } else {
      const err = await response.json();
      alert(`Handshake error: ${err.error || "Server error"}`);
    }
  } catch (e) {
    console.error(e);
  }
}

export function getUserToken() {
  return localStorage.getItem("airtable_user_token");
}

export function clearSession() {
  localStorage.clear();
  window.location.reload();
}
