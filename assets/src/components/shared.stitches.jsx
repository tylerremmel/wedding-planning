import { styled } from "../styles/stitches";

export const Button = styled("button", {
  display: "inline-flex",
  gap: "4px",
  alignItems: "center",
  borderRadius: "$sm",
  border: "none",
  cursor: "pointer",
  fontFamily: "$meta",
  fontWeight: 700,

  textDecoration: "none !important",
  transition: "transform 0.15s ease, background-color 0.25s ease",
  "&:disabled": {
    opacity: 0.65,
    cursor: "not-allowed",
  },
  variants: {
    variant: {
      blue: {
        backgroundColor: "$blue500",
        color: "$white",
        "&:hover:not(:disabled)": { backgroundColor: "$blue600" },
        "&:visited": {
          color: "$white",
        },
      },
      gray: {
        backgroundColor: "$gray300",
        color: "$gray800",
        "&:hover:not(:disabled)": { backgroundColor: "$gray400" },
        "&:visited": {
          color: "$gray800",
        },
      },
      red: {
        backgroundColor: "$red500",
        color: "$white",
        "&:hover:not(:disabled)": { backgroundColor: "$red600" },
        "&:visited": {
          color: "$white",
        },
      },
      white: {
        backgroundColor: "$white",
        color: "$gray800",
        "&:hover:not(:disabled)": { backgroundColor: "$gray100" },
        "&:visited": {
          color: "$gray800",
        },
      },
    },
    size: {
      standard: {
        padding: "9px 14px",
        fontSize: "0.9rem",
        lineHeight: 1.3,
      },
      compact: {
        padding: "8px 12px",
        fontSize: "0.8rem",
        lineHeight: 1,
      },
    },
    highlighted: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "blue",
      highlighted: true,
      css: { outline: "1px solid $blue800", outlineOffset: "-1px" },
    },
    {
      variant: "gray",
      highlighted: true,
      css: { outline: "1px solid $gray600", outlineOffset: "-1px" },
    },
    {
      variant: "red",
      highlighted: true,
      css: { outline: "1px solid $red800", outlineOffset: "-1px" },
    },
  ],
  defaultVariants: {
    size: "standard",
    variant: "gray",
    highlighted: false,
  },
});

export const ButtonGroup = styled("div", {
  display: "inline-flex",
  borderRadius: "$sm",
  overflow: "hidden",

  "& > button": {
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
  },
  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
  },
  defaultVariants: {
    direction: "column",
  },
});

export const Icon = styled("span", {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // react-icons renders its <svg> with explicit width/height="1em"
  // attributes, which beat the span's own box size unless overridden here.
  "& svg": {
    width: "100%",
    height: "100%",
    display: "block",
  },
  variants: {
    size: {
      100: { height: "12px", width: "12px" },
      125: { height: "15px", width: "15px" },
      150: { height: "18px", width: "18px" },
      200: { height: "24px", width: "24px" },
    },
  },
  defaultVariants: {
    size: "100",
  },
});
