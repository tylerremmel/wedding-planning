---
layout: page
title: Venues
permalink: /venues/
airtable_record_id: "rec4oypySbHwC526W" # <-- Paste your real 'rec' string here!
---

## Collaborative Discussion

<!-- 1. AUTHORIZATION WIDGET STATE CHANGER -->
<div id="auth-status-panel" style="padding: 15px; margin-bottom: 20px; border-radius: 5px; background: #f0f4f8;">
  <p id="auth-message">Checking login status...</p>
  <button id="login-btn" style="display:none; padding: 10px 15px; background: #1c7ed6; color:#fff; border:none; cursor:pointer;">Log In with Airtable</button>
  <button id="logout-btn" style="display:none; padding: 5px 10px; background: #e03131; color:#fff; border:none; cursor:pointer;">Log Out</button>
</div>

<!-- 2. THE RESTRICTED SUBMISSION FORM CONTAINER -->
<div id="secure-form-container" style="display: none;">
  <form id="submission-form">
    <input type="hidden" id="venue-record-id" value="{{ page.airtable_record_id }}">

    <p>Logged in as: <strong id="display-user-email">...</strong></p>

    <label for="user-message">Add a verified comment:</label>
    <textarea id="user-message" style="width:100%; height:80px;" required></textarea>

    <button type="submit" style="margin-top:10px; padding: 8px 16px;">Submit Comment</button>

  </form>
  <div id="form-status"></div>
</div>

<!-- FORCE THE BROWSER TO CLEAR CACHED FILES -->
<script src="{{ '/assets/js/airtable-submit.js' | relative_url }}?v=1.0.1"></script>
