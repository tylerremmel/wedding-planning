import { useEffect, useRef, useState } from "react";
import {
  getUserToken,
  redirectToAirtableOAuth,
  exchangeCodeForToken,
  getTokenExpiry,
  performTokenRefresh,
  savePreAuthState,
  restorePreAuthState,
} from "../utils/airtableAuth";
import { fetchUserProfile } from "../utils/airtableApi";

// Manages the Airtable OAuth session: initial code exchange, token expiry
// tracking, and silent refresh. `loadRecordsRef` lets this hook trigger a
// records load without taking a direct dependency on the records hook.
export function useAirtableAuth({ setStatusMessage, loadRecordsRef, onRestoreState }) {
  const [userToken, setUserToken] = useState(getUserToken());
  const [userEmail, setUserEmail] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(null);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const isRefreshing = useRef(false);
  const refreshAttempted = useRef(false);

  useEffect(() => {
    if (isRefreshing.current) {
      isRefreshing.current = false;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get("code");

    if (oauthCode) {
      setStatusMessage("Verifying authentication credentials...");
      (async () => {
        const ok = await exchangeCodeForToken(oauthCode);
        if (ok) {
          setUserToken(getUserToken());
          const u = new URL(window.location.href);
          u.search = "";
          window.history.replaceState({}, document.title, u.toString());
          const saved = restorePreAuthState();
          if (saved) onRestoreState(saved);
          setStatusMessage("Authentication successful. Loading records...");
          loadRecordsRef.current();
        } else {
          setStatusMessage("Authentication failed. Please try again.");
        }
      })();
      return;
    }

    if (userToken) {
      setStatusMessage("Session authorized. Fetching live dataset...");
      fetchUserProfile(userToken).then((profile) => {
        if (profile?.email) setUserEmail(profile.email);
      });
      loadRecordsRef.current();
    } else {
      setStatusMessage(
        "Log in with an approved Airtable account to unlock entries.",
      );
    }
  }, [userToken]);

  function invalidateAuthToken() {
    localStorage.removeItem("airtable_user_token");
    localStorage.removeItem("airtable_token_expiry");
    localStorage.removeItem("airtable_refresh_token");
    localStorage.removeItem("user_email");
    setUserToken(null);
    setMinutesLeft(null);
    setRefreshFailed(false);
    refreshAttempted.current = false;
  }

  useEffect(() => {
    if (!userToken) {
      setMinutesLeft(null);
      return;
    }
    function checkExpiry() {
      const expiry = getTokenExpiry();
      if (!expiry) return;
      const ms = expiry - Date.now();
      setMinutesLeft(ms > 0 ? Math.floor(ms / 60000) : 0);
    }
    checkExpiry();
    const id = setInterval(checkExpiry, 30000);
    return () => clearInterval(id);
  }, [userToken]);

  useEffect(() => {
    if (minutesLeft === null || minutesLeft > 5 || refreshAttempted.current)
      return;
    refreshAttempted.current = true;
    performTokenRefresh().then((ok) => {
      if (ok) {
        refreshAttempted.current = false;
        setRefreshFailed(false);
        isRefreshing.current = true;
        setUserToken(getUserToken());
      } else {
        setRefreshFailed(true);
      }
    });
  }, [minutesLeft]);

  function handleRefreshSession(pendingState) {
    savePreAuthState(pendingState);
    redirectToAirtableOAuth();
  }

  return {
    userToken,
    userEmail,
    minutesLeft,
    refreshFailed,
    invalidateAuthToken,
    handleRefreshSession,
  };
}
