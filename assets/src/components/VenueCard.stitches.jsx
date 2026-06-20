import { styled } from "../styles/stitches";

export const Card = styled("article", {
  backgroundColor: "$white",
  border: "1px solid $gray300",
  borderRadius: "$lg",
  overflow: "hidden",
  boxShadow: "$card",
  display: "flex",
  flexDirection: "column",
});

export const CarouselWrapper = styled("figure", {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
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
  backgroundColor: "rgba(255,255,255,0.92)",
  border: "none",
  color: "$gray800",
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  variants: {
    position: {
      left: {
        left: "15px",
      },
      right: {
        right: "15px",
      },
    },
  },
});

export const CardBody = styled("div", {
  padding: "20px",
});

export const VenueTitleRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "8px",
});

export const VenueTitleLink = styled("a", {
  textDecoration: "none",
  color: "inherit",
  "& h3": {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  "&:hover": {
    color: "$blue500",
  },
});

export const VenueAddress = styled("p", {
  margin: "0 0 16px",
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
  display: "block",
  fontSize: "0.9rem",
  lineHeight: 1.4,
  color: "$gray700",
});

export const CommentMeta = styled("span", {
  fontWeight: 700,
  color: "$gray800",
  whiteSpace: "nowrap",
  paddingRight: "4px",
});

export const CommentText = styled("span", {
  color: "$gray700",
  paddingTop: "12px",
});

export const CommentPortal = styled("div", {
  marginBottom: "8px",
});

export const CommentActions = styled("div", {
  display: "flex",
  gap: "8px",
});

export const AddCommentButton = styled("button", {
  padding: "8px 12px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$blue500",
  color: "$white",
  cursor: "pointer",
  fontWeight: 700,
});

export const HeartButton = styled("button", {
  padding: "8px 12px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$red500",
  color: "$white",
  cursor: "pointer",
  fontWeight: 700,
});

export const LikeButton = styled("button", {
  padding: "8px 12px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$gray300",
  color: "$gray800",
  cursor: "pointer",
  fontWeight: 700,
});

export const DislikeButton = styled("button", {
  padding: "8px 12px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$gray300",
  color: "$gray800",
  cursor: "pointer",
  fontWeight: 700,
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

export const CommentSubmit = styled("button", {
  justifySelf: "flex-end",
  padding: "8px 14px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$gray800",
  color: "$white",
  cursor: "pointer",
  fontWeight: 700,
  "&:disabled": {
    opacity: 0.65,
    cursor: "not-allowed",
  },
});

export const StatusMessage = styled("div", {
  fontSize: "0.85rem",
  color: "$gray500",
});
