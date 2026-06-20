---
layout: page
title: Venues
permalink: /venues/
---

## Explore Venues

<!-- GLOBAL AUTHORIZATION PANEL -->
<div id="auth-status-panel" style="padding: 15px; margin-bottom: 20px; border-radius: 8px; background: #f0f4f8; font-family: sans-serif;">
  <p id="auth-message" style="margin: 0 0 10px 0;">Checking login status...</p>
  <button id="login-btn" style="display:none; padding: 10px 15px; background: #1c7ed6; color:#fff; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">Log In with Airtable</button>
  <button id="logout-btn" style="display:none; padding: 5px 10px; background: #e03131; color:#fff; border:none; border-radius:4px; cursor:pointer;">Log Out</button>
</div>

<!-- CONTAINER WHERE CARDS WILL DYNAMICALLY GENERATE -->
<div id="venues-grid-container" style="display: grid; gap: 30px; max-width: 1200px; margin: 0 auto; font-family: sans-serif;">
  <p style="text-align: center; color: #868e96;">Loading wedding venue profiles...</p>
</div>

<!-- STYLING TO REPLICATE CAROUSEL AND CARD ACTIONS -->
<style>
  #venues-grid-container {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    #venues-grid-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .venue-card { background: #fff; border: 1px solid #e9ecef; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; position: relative; }
  .carousel-wrapper { position: relative; width: 100%; aspect-ratio: 4 / 3; background: #f1f3f5; }
  .carousel-slide { width: 100%; height: 100%; object-fit: cover; display: none; }
  .carousel-slide.active { display: block; }
  .carousel-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; font-weight: bold; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10; }
  .carousel-prev { left: 15px; }
  .carousel-next { right: 15px; }
  .card-body { padding: 20px; }
  .venue-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
  .venue-title-row h3 { margin: 0; font-size: 1.25rem; font-weight: 700; color: #212529; text-decoration: none; }
  .venue-title-link { text-decoration: none; color: inherit; }
  .venue-title-link:hover h3 { color: #1c7ed6; }
  .venue-address { margin: 0 0 15px 0; color: #495057; font-size: 0.95rem; }
  .comments-section { border-top: 1px solid #f1f3f5; padding-top: 15px; margin-top: 15px; }
  .comments-title { font-size: 0.9rem; font-weight: bold; color: #495057; margin-bottom: 10px; }
  .comment-bubble { display: flex; gap: 8px; font-size: 0.88rem; line-height: 1.4; margin-bottom: 12px; align-items: flex-start; }
  .comment-meta { font-weight: bold; color: #212529; white-space: nowrap; }
  .comment-text { color: #495057; }
  .comment-form { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; border-top: 1px dashed #e9ecef; padding-top: 15px; }
  .comment-input { width: 100%; height: 60px; padding: 10px; border: 1px solid #ced4da; border-radius: 8px; resize: none; font-size: 0.88rem; box-sizing: border-box; }
  .comment-submit { align-self: flex-end; padding: 6px 14px; background: #212529; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem; }
  .comment-submit:hover { background: #495057; }
</style>

<script src="{{ '/assets/js/airtable-submit.js' | relative_url }}?v=1.0.2"></script>
