import { createStitches } from "@stitches/react";

export const { styled, css, globalCss } = createStitches({
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
      blue500: "#1c7ed6",
      red500: "#e03131",
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
