import { createStitches } from "@stitches/react";

export const FONT_INTER = "Inter, system-ui, sans-serif";
export const FONT_XENON = "'Monaspace Xenon', ui-monospace, monospace";
export const FONT_ARGON = "'Monaspace Argon', ui-monospace, monospace";
export const FONT_BIZ = "'BIZ UDPMincho', serif";
export const FONT_QUICKSAND = "'Quicksand', system-ui, sans-serif";

const XENON_FONT_URL = `${window.SITE_BASEURL || ""}/assets/fonts/monaspace-xenon-var.woff2`;
const ARGON_FONT_URL = `${window.SITE_BASEURL || ""}/assets/fonts/monaspace-argon-var.woff2`;

export const { styled, css, globalCss, keyframes, theme } = createStitches({
  theme: {
    colors: {
      gray100: "#f8fafc",
      gray200: "#f1f3f5",
      gray300: "#e9ecef",
      gray400: "#ced4da",
      gray500: "#868e96",
      gray600: "#495057",
      gray700: "#343a40",
      gray800: "#212529",
      blue100: "#e7f5ff",
      blue200: "#d0ebff",
      blue300: "#a5d8ff",
      blue400: "#74c0fc",
      blue500: "#339af0",
      blue600: "#228be6",
      blue700: "#1c7ed6",
      blue800: "#1971c2",
      red100: "#fff5f5",
      red200: "#ffe3e3",
      red300: "#ffc9c9",
      red400: "#ffa8a8",
      red500: "#ff6b6b",
      red600: "#fa5252",
      red700: "#f03e3e",
      red800: "#e03131",
      amber100: "#fef3c7",
      amber200: "#fde68a",
      amber300: "#fcd34d",
      amber400: "#fbbf24",
      amber500: "#f59e0b",
      amber600: "#d97706",
      amber700: "#b45309",
      amber800: "#92400e",
      white: "#ffffff",
    },
    fonts: {
      headline: FONT_BIZ,
      body: FONT_BIZ,
      meta: FONT_QUICKSAND,
    },
    radii: {
      sm: "8px",
      md: "12px",
      lg: "16px",
    },
    shadows: {
      card: "0 12px 32px rgba(15, 23, 42, 0.08)",
    },
  },
  media: {
    sm: "(min-width: 640px)",
    lg: "(min-width: 1024px)",
  },
  utils: {
    px: (value) => ({ paddingLeft: value, paddingRight: value }),
    // e.g. fontVariation: { wght: 500, wdth: 115, slnt: -8 }
    fontVariation: (axes) => ({
      fontVariationSettings: Object.entries(axes)
        .map(([axis, value]) => `"${axis}" ${value}`)
        .join(", "),
    }),
  },
});

export const globalStyles = globalCss({
  "@import":
    "https://fonts.googleapis.com/css2?family=BIZ+UDPMincho:wght@400;700&family=Quicksand:wght@300..700&display=swap",
  "@font-face": [
    {
      fontFamily: "Monaspace Xenon",
      src: `url("${XENON_FONT_URL}") format("woff2")`,
      fontWeight: "200 800",
      fontStretch: "100% 125%",
      fontStyle: "oblique -11deg 0deg",
      fontDisplay: "swap",
    },
    {
      fontFamily: "Monaspace Argon",
      src: `url("${ARGON_FONT_URL}") format("woff2")`,
      fontWeight: "200 800",
      fontStretch: "100% 125%",
      fontStyle: "oblique -11deg 0deg",
      fontDisplay: "swap",
    },
  ],
  "*": {
    boxSizing: "border-box",
  },
  html: {
    fontSize: "16px",
  },
  body: {
    margin: 0,
    minHeight: "100vh",
    fontFamily: "$body",
    backgroundColor: "$gray100",
    color: "$gray800",
  },
  button: {
    fontFamily: "$body",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
});

export const bizUdpminchoRegular = css({
  fontFamily: FONT_BIZ,
  fontWeight: 400,
  fontStyle: "normal",
});

export const bizUdpminchoBold = css({
  fontFamily: FONT_BIZ,
  fontWeight: 700,
  fontStyle: "normal",
});
