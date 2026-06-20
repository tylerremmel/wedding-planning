This site is deployed to https://tylerremmel.github.io/wedding-planning/

## React / Vite Setup

This project now uses React for the venue interface on `venues.md`.
The old `assets/js/airtable-submit.js` script has been removed and replaced by the React build.

### Install dependencies

```bash
npm install
```

### Build the React bundle

```bash
npm run build
```

### Development

```bash
npm run dev
```

### Local preview with automatic React rebuilds

Run this command to start Vite in build watch mode and Jekyll locally together:

```bash
npm run preview
```

This will keep `npm run watch` rebuilding `assets/js/airtable-interface.bundle.js` on changes and serve the site with Jekyll on `http://127.0.0.1:4001/`.

Open the local site in your browser manually when it is ready.

The React bundle is emitted to `assets/js/airtable-interface.bundle.js`, and `venues.md` mounts the application into the `#airtable-interface-root` element.
