import { styled } from "../styles/stitches";

export const Button = styled("button", {
  display: "inline-flex",
  gap: "4px",
  alignItems: "center",
  borderRadius: "$sm",
  border: "none",
  cursor: "pointer",
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
  },
  defaultVariants: {
    size: "standard",
    variant: "gray",
  },
});
