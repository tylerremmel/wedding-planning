import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes } = createStitches({
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
      body: "Inter, system-ui, sans-serif",
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
  },
});

export const globalStyles = globalCss({
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
