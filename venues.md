---
layout: venues
title: Venues
permalink: /venues/
scheme: light
noindex: true
---

<style>
  /* Constrain the Airtable interface itself while letting it use the wider page */
  #airtable-interface-root {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>

<div id="airtable-interface-root">
  <p style="text-align: center; color: #868e96;">Loading wedding venue profiles...</p>
</div>

<script>window.SITE_BASEURL = "{{ site.baseurl }}";</script>
<script src="{{ '/assets/js/airtable-interface.bundle.js' | relative_url }}"></script>
