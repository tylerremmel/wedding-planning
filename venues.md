---
layout: page
title: Venues
permalink: /venues/
---

## Submit Your Information

<!-- Your HTML Form -->
<form id="submission-form">
  <label for="user-message">Message:</label>
  <textarea id="user-message" required></textarea>
  <button type="submit">Submit Data</button>
</form>

<div id="form-status"></div>

<!-- The Script Tag linking your JS file -->
<script src="{{ '/assets/js/airtable-submit.js' | relative_url }}"></script>
