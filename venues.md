---
layout: page
title: Venues
permalink: /venues/
---

<style>
  /* Allow this page's content area to expand beyond the site's default wrapper */
  .page-content > .wrapper {
    max-width: 100% !important;
    padding-left: 16px;
    padding-right: 16px;
  }

  /* React bundle injects * { box-sizing: border-box } globally, which shrinks Minima's
     .wrapper from 800px visual to 740px. Use higher-specificity selectors to restore
     the correct 800px width (border-box 800px = 740px content + 60px padding). */
  .site-header .wrapper,
  .site-footer .wrapper {
    max-width: 800px;
  }

  .post-title {
    max-width: 800px;
    margin: auto;
    padding-right: 30px;
    padding-left: 30px;
  }

  /* Constrain the Airtable interface itself while letting it use the wider page */
  #airtable-interface-root {
    max-width: 1200px;
    margin: 0 auto;
    font-family: sans-serif;
  }
</style>

<div id="airtable-interface-root">
  <p style="text-align: center; color: #868e96;">Loading wedding venue profiles...</p>
</div>

<script src="{{ '/assets/js/airtable-interface.bundle.js' | relative_url }}"></script>
