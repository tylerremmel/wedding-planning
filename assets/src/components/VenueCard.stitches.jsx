import { styled, keyframes } from "../styles/stitches";
export { Button } from "./shared.stitches";

const skeletonPulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

export const Card = styled("article", {
  backgroundColor: "$white",
  border: "1px solid $gray300",
  borderRadius: "$lg",
  overflow: "hidden",
  boxShadow: "$card",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "background 0.25s ease, border-color 0.25s ease",
  "&:hover": {
    backgroundColor: "$gray100",
    borderColor: "$gray300",
  },
  variants: {
    highlighted: {
      true: {
        backgroundColor: "$gray100",
        borderColor: "$gray300",
      },
    },
  },
});

export const CarouselWrapper = styled("figure", {
  position: "relative",
  width: "100%",
  aspectRatio: "5 / 4",
  overflow: "hidden",
  backgroundColor: "$gray200",
  marginBottom: 0,
});

export const CarouselImage = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
});

export const CarouselNav = styled("button", {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.4)",
  border: "none",
  color: "$gray800",
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    position: {
      left: {
        left: "12px",
      },
      right: {
        right: "12px",
      },
    },
  },
  transition: "background 0.25s ease",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});

export const CardBody = styled("div", {
  padding: "16px",
});

export const VenueTitleRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "4px",
});

export const VenueTitleLink = styled("div", {
  textDecoration: "none",
  color: "inherit",
  "& h3": {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 700,
  },
});

export const VenueAddress = styled("p", {
  color: "$gray500",
  fontSize: "0.85rem",
  lineHeight: 1.5,
});

export const VenueVibe = styled("p", {
  margin: "0 0 12px",
  color: "$gray600",
  fontSize: "0.95rem",
  lineHeight: 1.5,
});

export const CommentsSection = styled("div", {
  borderTop: "1px solid $gray200",
  paddingTop: "16px",
});

export const CommentsTitle = styled("div", {
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "$gray700",
  marginBottom: "10px",
});

export const CommentsStream = styled("div", {
  display: "grid",
  gap: "12px",
});

export const CommentBubble = styled("div", {
  display: "inline",
  fontSize: "0.85rem",
  lineHeight: 1.4,
  border: "1px solid $blue500",
  backgroundColor: "$blue100",
  padding: "8px 12px",
  marginRight: "auto",
  borderRadius: "0 $sm $sm $sm",
  color: "$blue800",
  marginTop: "12px",
});

export const CommentMeta = styled("span", {
  fontWeight: 700,
  whiteSpace: "nowrap",
  paddingRight: "4px",
});

export const CommentText = styled("span", {
  paddingTop: "12px",
});

export const CommentPortal = styled("div", {});

export const CommentActions = styled("div", {
  display: "flex",
  gap: "8px",
});

export const Icon = styled("span", {
  position: "relative",
  top: "2px",
});

export const CommentForm = styled("form", {
  display: "grid",
  gap: "12px",
  marginTop: "12px",
});

export const CommentInput = styled("textarea", {
  width: "100%",
  minHeight: "80px",
  padding: "12px",
  borderRadius: "$sm",
  border: "1px solid $gray300",
  resize: "vertical",
  fontSize: "0.95rem",
  color: "$gray800",
  backgroundColor: "$white",
});

export const CommentInputActions = styled("div", {
  justifySelf: "flex-end",
  display: "flex",
  gap: "8px",
});

export const StatusMessage = styled("div", {
  fontSize: "0.85rem",
  color: "$gray500",
});

export const InnerDrawer = styled("div", {
  padding: "24px",
  width: "calc(50vw + 0.1 * min(100vw, 1240px) - 20px)",
});

export const DrawerCloseButton = styled("button", {
  position: "absolute",
  top: "24px",
  right: "24px",
  padding: "10px",
  height: "38px",
  width: "38px",
  borderRadius: "100px",
  border: "1px solid $gray300",
  backgroundColor: "$white",
  color: "$gray800",
  fontWeight: 700,
  transition: "background 0.25s ease",
  "&:hover": {
    backgroundColor: "$gray200",
  },
});

export const DrawerVenueName = styled("h2", {
  fontSize: "1.5rem",
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: "16px",
  paddingRight: "60px", // space for close button
  wordBreak: "break-word",
});

export const DrawerLinksRow = styled("div", {
  display: "flex",
  gap: "8px",
});

export const DrawerContactInfoRow = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "6px",
  fontSize: "0.9rem",
  color: "$gray500",
  a: {
    transition: "color 0.25s ease",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "$gray700",
    },
  },
});

export const DrawerContactInfo = styled("div", {
  marginBottom: "16px",
});

export const DrawerCommentsSection = styled("div", {
  borderBottom: "1px solid $gray200",
  padding: "16px 0",
  marginBottom: "16px",
  position: "sticky",
  top: "0px",
  backgroundColor: "$white",
  zIndex: 1,
});

export const DrawerBody = styled("div", {
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "$gray700",
  marginBottom: "24px",
});

export const DrawerImageGrid = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "24px",
  paddingTop: "24px",
  borderTop: "1px solid $gray200",
});

export const DrawerImageWrapper = styled("div", {
  position: "relative",
  overflow: "hidden",
  borderRadius: "$sm",
  backgroundColor: "$gray200",
});

export const DrawerImageSkeleton = styled("div", {
  position: "absolute",
  inset: 0,
  backgroundColor: "$gray300",
  animation: `${skeletonPulse} 1.5s ease-in-out infinite`,
});

export const DrawerImageEl = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
  transition: "opacity 0.3s ease",
});
