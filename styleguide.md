---
layout: default
title: Styleguide
permalink: /styleguide/
noindex: true
---
{% assign scales = "100,200,300,400,500,600,700,800,900,950" | split: "," %}
{% assign steps = "050,075,087,100,112,125,150,175,200,225,250,300,400" | split: "," %}
{% assign roles = "headline,subhead,body,meta" | split: "," %}
<div class="sg">

<section>
<h2 class="headline s-200">Color: sapphire</h2>
<p class="sg__note">Base sea-glass is <strong>sapphire-600 (#007776)</strong>. All other steps are generated at one OKLCH hue, with lightness stepping evenly around 600 and chroma tapering toward both ends. Values live in <code>assets/css/tokens.css</code>.</p>
<h3 class="subhead s-100">Static ramp (<code>--sapphire-N-static</code>)</h3>
<p class="sg__note">Never changes with the user's scheme. Use when a color must stay fixed.</p>
<div class="sg-swatches">
{%- for n in scales %}
  <div class="sg-swatch"><div class="sg-swatch__chip" style="background: var(--sapphire-{{ n }}-static)"></div><div class="sg-swatch__label">sapphire-{{ n }}-static</div></div>
{%- endfor %}
</div>

<h3 class="subhead s-100">Scheme ramp (<code>--sapphire-N</code>)</h3>
<p class="sg__note">Follows the user's scheme: light uses the static values; dark mirrors the ramp (100 ↔ 950, 200 ↔ 900, 300 ↔ 800, 400 ↔ 700, 500 ↔ 600). Both are forced below regardless of your OS; the page itself follows your OS.</p>
<div class="sg-scheme scheme-light">
  <p class="eyebrow">Light</p>
  <div class="sg-swatches">
  {%- for n in scales %}
    <div class="sg-swatch"><div class="sg-swatch__chip" style="background: var(--sapphire-{{ n }})"></div><div class="sg-swatch__label">sapphire-{{ n }}</div></div>
  {%- endfor %}
  </div>
  <div class="sg-bar" style="background: var(--header-bg); color: var(--text-on-header); margin-top: var(--space-100)">header / footer: sapphire-600</div>
  <p>Page <strong>white</strong>, text and rules <strong>sapphire-600</strong>. <a href="#">A link</a></p>
</div>
<div class="sg-scheme scheme-dark">
  <p class="eyebrow">Dark</p>
  <div class="sg-swatches">
  {%- for n in scales %}
    <div class="sg-swatch"><div class="sg-swatch__chip" style="background: var(--sapphire-{{ n }})"></div><div class="sg-swatch__label">sapphire-{{ n }}</div></div>
  {%- endfor %}
  </div>
  <div class="sg-bar" style="background: var(--header-bg); color: var(--text-on-header); margin-top: var(--space-100)">header / footer: sapphire-800-static</div>
  <p>Page <strong>sapphire-950-static</strong>, text <strong>white</strong>, rules and accents <strong>sapphire-300-static</strong>. <a href="#">A link</a></p>
</div>
<div class="sg-table-wrap"><table class="sg-table">
<thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead>
<tbody>
<tr><td>--surface</td><td>white</td><td>sapphire-950</td></tr>
<tr><td>--text</td><td>sapphire-600 (5.4:1 on white)</td><td>white (16.4:1 on 950)</td></tr>
<tr><td>--text-on-header</td><td>white (5.4:1 on 600)</td><td>white (9.8:1 on 800)</td></tr>
<tr><td>--accent / --rule</td><td>sapphire-600</td><td>sapphire-300 (11.0:1 on 950)</td></tr>
<tr><td>--header-bg / --footer-bg / --tab-bg</td><td>sapphire-600</td><td>sapphire-800</td></tr>
</tbody></table></div>
</section>

<section>
<h2 class="headline s-200">Type ramp</h2>
<p class="sg__note">Four roles × thirteen steps. Step N is N% of 1rem (100 = 16px). Weight is per role per step. Body is 450 → 500 at step 200+. Headline (480 at step 050, 440 at step 100, 370 at step 400), subhead and meta (Roboto Flex) all ramp: heavier at small sizes, settling to 100 at large sizes (meta from 155 at step 100 up to 220 at step 050; subhead 135 at step 100 up to 190 at step 050).</p>
<div class="sg-ramp">
  <div class="sg-ramp__head">Step</div>
  {%- for r in roles %}<div class="sg-ramp__head">{{ r }}</div>{% endfor %}
  {%- for s in steps %}
  <div class="sg-ramp__head">{{ s }}</div>
  {%- for r in roles %}
  <div class="{{ r }} s-{{ s }}">{% if s == "400" %}Jen{% else %}Jenna{% endif %}</div>
  {%- endfor %}
  {%- endfor %}
</div>
</section>

<section>
<h2 class="headline s-200">Role / step usage</h2>
<p class="sg__note">Elements map to a role and step in <code>assets/css/base.css</code>. Mobile applies below 640px, desktop at 640px and up. Rows marked <em>provisional</em> have no Figma reference yet and will be confirmed at the Our Story review.</p>
<div class="sg-table-wrap"><table class="sg-table">
<thead><tr><th>Element / class</th><th>Role</th><th>Mobile (393)</th><th>Desktop (1280)</th><th>Source</th></tr></thead>
<tbody>
<tr><td>h1 (hero title)</td><td>headline</td><td>225 (36px)</td><td>400 (64px)</td><td>Figma 1:2, 1:3</td></tr>
<tr><td>.lead (intro line)</td><td>body</td><td>150 (provisional)</td><td>200 (32px)</td><td>Figma 76:1452</td></tr>
<tr><td>p, li, body</td><td>body</td><td>100</td><td>100 (16px / 1.5)</td><td>Figma 76:1452</td></tr>
<tr><td>.tile-title</td><td>headline</td><td>150</td><td>150 (24px)</td><td>Figma 76:1452</td></tr>
<tr><td>.site-footer__title</td><td>headline</td><td>150</td><td>150 (24px)</td><td>Figma 76:1452</td></tr>
<tr><td>nav a</td><td>meta (uppercase, +0.1em)</td><td>075 (12px)</td><td>100 (16px)</td><td>Figma 1:2, 1:3</td></tr>
<tr><td>.eyebrow (date line)</td><td>subhead</td><td>087 (provisional)</td><td>100 (16px)</td><td>Figma 76:1452</td></tr>
<tr><td>h2 (section headings)</td><td>headline</td><td>200 (32px)</td><td>300 (48px)</td><td>reduced from Figma's 64px at your request</td></tr>
<tr><td>h3</td><td>headline</td><td>112</td><td>150</td><td>provisional</td></tr>
<tr><td>h4</td><td>subhead</td><td>087</td><td>100</td><td>provisional</td></tr>
<tr><td>h5, h6</td><td>subhead</td><td>075</td><td>087</td><td>provisional</td></tr>
<tr><td>blockquote</td><td>body</td><td>125</td><td>125</td><td>provisional</td></tr>
<tr><td>figcaption (captions)</td><td>meta</td><td>075</td><td>075 (12px)</td><td>Figma 19:1187</td></tr>
<tr><td>small</td><td>meta</td><td>087</td><td>087</td><td>provisional</td></tr>
<tr><td>.label (dates, small titles)</td><td>meta, strong weight</td><td>100</td><td>100 (16px)</td><td>Figma 19:1187</td></tr>
<tr><td>.meta s-100 (timeline text, quotes)</td><td>meta</td><td>100</td><td>100 (16px)</td><td>Figma 19:1187</td></tr>
<tr><td>section nav links</td><td>meta (uppercase, +0.1em)</td><td>100</td><td>100 (16px)</td><td>Figma 19:1343, 76:1525</td></tr>
</tbody></table></div>
<p class="sg__note" style="margin-top: var(--space-100)">Old Figma names → new steps: 100 → 100, 150 → 150, 200 → 200, 250 (48px) → 300; old 300 (64px) → 400.</p>
</section>

<section>
<h2 class="headline s-200">Spacing</h2>
<p class="sg__note">One scale for every margin, padding and gap above 8px (8px and below may be plain values). Named like the type steps: N is N% of 1rem. Paragraph spacing is <code>--paragraph-spacing</code> (<code>--space-150</code>, 24px) and is set once in <code>base.css</code>.</p>
{% assign spaces = "025,050,075,100,150,200,225,300,400,500,600" | split: "," %}
<div class="sg-table-wrap"><table class="sg-table">
<thead><tr><th>Token</th><th>Size</th><th>Bar</th></tr></thead>
<tbody>
{%- for n in spaces %}
<tr><td>--space-{{ n }}</td><td>{{ n | times: 16 | divided_by: 100 }}px</td><td><div class="sg-space-bar" style="width: var(--space-{{ n }})"></div></td></tr>
{%- endfor %}
</tbody></table></div>
<p class="sg__note" style="margin-top: var(--space-100)">Roles: <code>--paragraph-spacing</code> = 150, <code>--section-gap</code> = 225 (between blocks on Our Story), <code>--divider-space</code> = 400 (above and below a divider), <code>--gutter</code> = 150.</p>
</section>

<section>
<h2 class="headline s-200">Ornament divider</h2>
<p class="sg__note">Ornament height is a token (<code>--divider-ornament-height</code>: 42px at 640px and up, 32px below); the rules are drawn at the same scale so they match the ornament.</p>
{% include divider.html ornament=true %}
<div style="max-width:320px;margin: var(--space-150) auto 0">{% include divider.html ornament=true %}</div>
<h3 class="subhead s-100">Plain rule (every divider after the first on a page)</h3>
{% include divider.html %}
</section>

<section>
<h2 class="headline s-200">Image group</h2>
<p class="sg__note">One to three images with an optional caption (<code>_includes/image-group.html</code>). Data shape: <code>images: [{src, alt, width, height}]</code> and <code>caption</code>. Missing alt text is outlined in dashed yellow in dev builds.</p>
{% assign g1 = site.data.story_images.glacier %}
{% assign g2 = site.data.milestones[2] %}
<h3 class="subhead s-100">Single, landscape</h3>
{% include image-group.html group=g1 %}
<h3 class="subhead s-100">Single, portrait</h3>
{% include image-group.html group=site.data.story_images.first_kiss %}
<h3 class="subhead s-100">Pair (stacks when narrow)</h3>
{% include image-group.html group=g2 %}
</section>

<section>
<h2 class="headline s-200">Timeline</h2>
<p class="sg__note">From <code>_data/milestones.yml</code>. Date is the <code>.label</code> style; text is <code>.meta</code> at step 100.</p>
<ol class="timeline" style="max-width:640px">
  <li class="timeline__item"><time class="timeline__date label s-100">May 7, 2021</time><div class="timeline__body"><p class="meta s-100">Jenna messages Tyler on Bumble</p></div></li>
  <li class="timeline__item"><time class="timeline__date label s-100">May 17, 2021</time><div class="timeline__body"><p class="meta s-100">Jenna and Tyler’s first date. They meet in Lincoln Park to grab coffee and tea.</p></div></li>
</ol>
</section>

<section>
<h2 class="headline s-200">Sticky section nav</h2>
<p class="sg__note">Desktop bar shown here (on the real page it is generated from the page's own <code>## headings</code>). On the real page it is hidden until the first divider scrolls out of view, then fades in. Below 640px it becomes the current section with a chevron; opening it lists the other sections. See it live on <a href="{{ '/our-story/' | relative_url }}">/our-story/</a>.</p>
{% include section-nav.html static=true demo="How we met,Milestones,The proposal,The pig" %}
</section>

</div>
