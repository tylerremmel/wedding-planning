// CONFIGURATION VARIABLES
const CLIENT_ID = "5cf62d42-4eab-4c8c-9509-5aba4e28c22d"; // <-- Paste your public Client ID here
const PROXY_BASE = "https://airtable-proxy-olive.vercel.app"; // Your Vercel domain URL

var REDIRECT_URI = window.location.origin + window.location.pathname;

// CRYPTOGRAPHIC GENERATORS FOR PUBLIC OAUTH CLIENT PKCE VALIDATION
function generateRandomString(length) {
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

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

document.addEventListener("DOMContentLoaded", async function () {
  const authMessage = document.getElementById("auth-message");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const gridContainer = document.getElementById("venues-grid-container");

  if (!authMessage || !gridContainer) {
    console.warn("Airtable auth script: required DOM elements are missing.");
    return;
  }

  // HOOK UP BUTTON LISTENERS
  if (loginBtn) {
    loginBtn.addEventListener("click", redirectToAirtableOAuth);
  } else {
    console.warn("Airtable auth script: login button not found.");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.reload();
    });
  } else {
    console.warn("Airtable auth script: logout button not found.");
  }

  // STEP A: INTERCEPT RETURNING CODE FROM AIRTABLE
  const urlParams = new URLSearchParams(window.location.search);
  const oauthCode = urlParams.get("code");

  if (oauthCode) {
    authMessage.innerText = "Verifying authentication credentials...";
    window.history.replaceState({}, document.title, window.location.pathname);
    await exchangeCodeForToken(oauthCode);
  }

  // STEP B: INITIALIZE AND EVALUATE SYSTEM RUNTIME STATE
  evaluateGlobalSessionState();

  async function redirectToAirtableOAuth() {
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);

    localStorage.setItem("oauth_state", state);
    localStorage.setItem("oauth_code_verifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const scopes =
      "user.email:read data.records:read data.records:write data.recordComments:read data.recordComments:write";

    // Explicit, cleanly separated search parameters to stop string compile breaks
    const targetQuery = new URLSearchParams();
    targetQuery.append("response_type", "code");
    targetQuery.append("client_id", CLIENT_ID);
    targetQuery.append("redirect_uri", REDIRECT_URI);
    targetQuery.append("scope", scopes);
    targetQuery.append("state", state);
    targetQuery.append("code_challenge", codeChallenge);
    targetQuery.append("code_challenge_method", "S256");

    const authUrl = `https://airtable.com/oauth2/v1/authorize?${targetQuery.toString()}`;
    console.debug("Airtable OAuth redirect", {
      authUrl,
      state,
      redirectUri: REDIRECT_URI,
    });
    window.location.href = authUrl;
  }

  async function exchangeCodeForToken(code) {
    try {
      const response = await fetch(`${PROXY_BASE}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          redirectUri: REDIRECT_URI,
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

  async function evaluateGlobalSessionState() {
    const userToken = localStorage.getItem("airtable_user_token");

    if (userToken) {
      authMessage.innerHTML = `Session Authorized. Fetching live dataset...`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";

      await fetchLiveAirtableRecords(userToken);
    } else {
      authMessage.innerText =
        "Log in with an approved Airtable account to unlock entries.";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      gridContainer.innerHTML = `<p style="text-align: center; color: #868e96;">Workspace locked. Authentication required.</p>`;
    }
  }

  async function fetchLiveAirtableRecords(token) {
    try {
      const response = await fetch(`${PROXY_BASE}/api/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: token }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.records && data.records.length > 0) {
          await renderVenueCards(data.records);
          authMessage.innerHTML = `Displaying ${data.records.length} live files.`;
        } else {
          gridContainer.innerHTML = `<p style="text-align: center; color: #868e96;">No records found.</p>`;
        }
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
        gridContainer.innerHTML = `<p style="text-align: center; color: #e03131;">Data Error: ${message}</p>`;
      }
    } catch (error) {
      console.error("Airtable proxy request failed", error);
      gridContainer.innerHTML = `<p style="text-align: center; color: #e03131;">Connection dropped.</p>`;
    }
  }

  async function renderVenueCards(records) {
    gridContainer.innerHTML = "";

    records.forEach((record) => {
      const fields = record.fields;
      let parsedImages = [];
      try {
        parsedImages = JSON.parse(fields["Images JSON"] || "[]");
      } catch (e) {
        parsedImages = [];
      }
      if (parsedImages.length === 0)
        parsedImages.push("https://placeholder.com");

      const card = document.createElement("div");
      card.className = "venue-card";

      let slidesHtml = parsedImages
        .map(
          (imgUrl, idx) => `
        <img class="carousel-slide ${idx === 0 ? "active" : ""}" src="${imgUrl}" alt="${fields["Venue name"]}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x400?text=Image+Unavailable';" />
      `,
        )
        .join("");

      let navButtonsHtml =
        parsedImages.length > 1
          ? `
        <button class="carousel-nav carousel-prev">‹</button>
        <button class="carousel-nav carousel-next">›</button>
      `
          : "";

      card.innerHTML = `
        <div class="carousel-wrapper">${slidesHtml}${navButtonsHtml}</div>
        <div class="card-body">
          <div class="venue-title-row">
            <a href="${fields["URL"]}" target="_blank" class="venue-title-link">
              <h3>${fields["Venue name"]}</h3>
            </a>
          </div>
          <p class="venue-address">${fields["Full address"] || "No address supplied."}</p>
          <div class="comments-section">
            <div class="comments-title">Discussion Feed</div>
            <div class="comments-stream-target" id="stream-${record.id}">
              <p style="font-size:0.82rem; color:#868e96; margin:0;">Comments loading...</p>
            </div>
            <div class="secure-comment-portal" id="comment-portal-${record.id}" style="display: none;">
              <button type="button" class="add-comment-button" data-record-id="${record.id}" style="margin-top:8px; padding: 6px 10px; border-radius:6px; border:none; background:#1c7ed6; color:#fff; cursor:pointer;">Add comment</button>
              <form class="comment-form" data-target-rec="${record.id}" style="display: none; margin-top: 12px;">
                <textarea name="commentText" class="comment-input" placeholder="Add a verified comment..." required></textarea>
                <button type="submit" class="comment-submit">Post Comment</button>
              </form>
              <div class="form-status-msg" style="font-size:0.8rem; margin-top:4px; color:#868e96;"></div>
            </div>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
      setupCarouselInteractions(card);
    });

    await loadCommentsSequentially(records);
  }

  function setupCarouselInteractions(card) {
    const slides = card.querySelectorAll(".carousel-slide");
    const prevBtn = card.querySelector(".carousel-prev");
    const nextBtn = card.querySelector(".carousel-next");
    if (!prevBtn || !nextBtn) return;

    let currentIdx = 0;
    prevBtn.addEventListener("click", () => {
      currentIdx = currentIdx === 0 ? slides.length - 1 : currentIdx - 1;
      slides.forEach((s, i) => s.classList.toggle("active", i === currentIdx));
    });
    nextBtn.addEventListener("click", () => {
      currentIdx = currentIdx === slides.length - 1 ? 0 : currentIdx + 1;
      slides.forEach((s, i) => s.classList.toggle("active", i === currentIdx));
    });
  }

  async function fetchAndRenderRecordComments(recordId) {
    const targetStream = document.getElementById(`stream-${recordId}`);
    const commentPortal = document.getElementById(`comment-portal-${recordId}`);
    const token = localStorage.getItem("airtable_user_token");

    if (!targetStream) return;

    try {
      const response = await fetch(
        `${PROXY_BASE}/api/comments?recordId=${recordId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userToken: token }),
        },
      );

      if (response.ok) {
        const payload = await response.json();
        const comments = payload.comments || [];
        if (comments.length === 0) {
          targetStream.innerHTML = `<p style="font-size:0.82rem; color:#adb5bd; margin:0;">No notes added yet.</p>`;
        } else {
          targetStream.innerHTML = comments
            .map(
              (c) => `
          <div class="comment-bubble">
            <span class="comment-meta">${c.author?.name || "User"}:</span>
            <span class="comment-text">${c.text}</span>
          </div>
        `,
            )
            .join("");
        }

        if (commentPortal) {
          commentPortal.style.display = "block";
          const commentForm = commentPortal.querySelector(".comment-form");
          const addButton = commentPortal.querySelector(".add-comment-button");
          if (commentForm && addButton) {
            commentForm.style.display = "none";
            addButton.style.display = "inline-flex";
          }
        }
      } else if (response.status === 429) {
        targetStream.innerHTML = `<p style="font-size:0.82rem; color:#e03131; margin:0;">Comments are temporarily unavailable due to rate limits. Please try again later.</p>`;
      } else {
        targetStream.innerHTML = `<p style="font-size:0.82rem; color:#e03131; margin:0;">Unavailable.</p>`;
      }
    } catch (err) {
      console.error("Comment fetch failed", err);
      targetStream.innerHTML = `<p style="font-size:0.82rem; color:#e03131; margin:0;">Fetch drop.</p>`;
    }
  }

  async function loadCommentsSequentially(records) {
    for (const record of records) {
      const targetStream = document.getElementById(`stream-${record.id}`);
      if (targetStream) {
        targetStream.innerHTML = `<p style="font-size:0.82rem; color:#868e96; margin:0;">Comments loading...</p>`;
        await fetchAndRenderRecordComments(record.id);
      }
    }
  }

  gridContainer.addEventListener("click", function (e) {
    const addCommentButton = e.target.closest(".add-comment-button");
    if (!addCommentButton) return;

    const recordId = addCommentButton.getAttribute("data-record-id");
    const commentPortal = document.getElementById(`comment-portal-${recordId}`);
    if (!commentPortal) return;

    const commentForm = commentPortal.querySelector(".comment-form");
    const addButton = commentPortal.querySelector(".add-comment-button");

    if (commentForm && addButton) {
      addButton.style.display = "none";
      commentForm.style.display = "flex";
    }
  });

  gridContainer.addEventListener("submit", async function (e) {
    if (!e.target.classList.contains("comment-form")) return;
    e.preventDefault();

    const form = e.target;
    const recordId = form.getAttribute("data-target-rec");
    const textarea = form.querySelector(".comment-input");
    const statusMsg = form.nextElementSibling;
    const submitBtn = form.querySelector(".comment-submit");

    submitBtn.disabled = true;
    statusMsg.innerText = "Posting comment...";

    try {
      const response = await fetch(`${PROXY_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userToken: localStorage.getItem("airtable_user_token"),
          recordId: recordId,
          commentText: textarea.value,
        }),
      });

      if (response.ok) {
        statusMsg.innerText = "Success!";
        textarea.value = "";
        await fetchAndRenderRecordComments(recordId);
        setTimeout(() => {
          statusMsg.innerText = "";
        }, 3000);
      } else {
        const resData = await response.json();
        statusMsg.innerText = `Blocked: ${resData.error || response.statusText}`;
      }
    } catch (err) {
      statusMsg.innerText = "Error posting entry.";
    } finally {
      submitBtn.disabled = false;
    }
  });
});
