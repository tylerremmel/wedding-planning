import React, { useEffect, useState } from "react";
import { styled } from "../styles/stitches";
import { fetchRecordComments, submitComment } from "../utils/airtableApi";

const Card = styled("article", {
  backgroundColor: "$white",
  border: "1px solid $gray300",
  borderRadius: "$lg",
  overflow: "hidden",
  boxShadow: "$card",
  display: "flex",
  flexDirection: "column",
});

const CarouselWrapper = styled("div", {
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  backgroundColor: "$gray200",
});

const CarouselImage = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const CarouselNav = styled("button", {
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

const CardBody = styled("div", {
  padding: "20px",
});

const VenueTitleRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "8px",
});

const VenueTitleLink = styled("a", {
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

const VenueAddress = styled("p", {
  margin: "0 0 16px",
  color: "$gray600",
  fontSize: "0.95rem",
  lineHeight: 1.5,
});

const CommentsSection = styled("div", {
  borderTop: "1px solid $gray200",
  paddingTop: "16px",
});

const CommentsTitle = styled("div", {
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "$gray700",
  marginBottom: "10px",
});

const CommentsStream = styled("div", {
  display: "grid",
  gap: "12px",
});

const CommentBubble = styled("div", {
  display: "flex",
  gap: "10px",
  fontSize: "0.9rem",
  lineHeight: 1.4,
  color: "$gray700",
});

const CommentMeta = styled("span", {
  fontWeight: 700,
  color: "$gray800",
  whiteSpace: "nowrap",
});

const CommentText = styled("span", {
  color: "$gray700",
});

const CommentPortal = styled("div", {
  marginTop: "14px",
});

const AddCommentButton = styled("button", {
  marginTop: "8px",
  padding: "8px 12px",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$blue500",
  color: "$white",
  cursor: "pointer",
  fontWeight: 700,
});

const CommentForm = styled("form", {
  display: "grid",
  gap: "12px",
  marginTop: "12px",
});

const CommentInput = styled("textarea", {
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

const CommentSubmit = styled("button", {
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

const StatusMessage = styled("div", {
  fontSize: "0.85rem",
  color: "$gray500",
  marginTop: "6px",
});

export default function VenueCard({ record, userToken }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");

  const fields = record.fields;
  let images = [];
  try {
    images = JSON.parse(fields["Images JSON"] || "[]");
  } catch (e) {
    images = [];
  }
  if (images.length === 0) {
    images = ["https://via.placeholder.com/600x400?text=Image+Unavailable"];
  }

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      setCommentsLoading(true);
      try {
        const payload = await fetchRecordComments(record.id, userToken);
        if (!cancelled) {
          setComments(payload.comments || []);
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
        if (!cancelled) {
          setComments([]);
        }
      } finally {
        if (!cancelled) setCommentsLoading(false);
      }
    }

    loadComments();
    return () => {
      cancelled = true;
    };
  }, [record.id, userToken]);

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const trimmedText = commentText.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    setSubmitStatus("Posting comment...");

    try {
      await submitComment(record.id, trimmedText, userToken);
      setCommentText("");
      setSubmitStatus("Success!");
      setShowCommentForm(false);
      const payload = await fetchRecordComments(record.id, userToken);
      setComments(payload.comments || []);
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (err) {
      setSubmitStatus(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentImage = images[currentImageIdx];

  return (
    <Card>
      <CarouselWrapper>
        <CarouselImage
          src={currentImage}
          alt={fields["Venue name"]}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "https://via.placeholder.com/600x400?text=Image+Unavailable";
          }}
        />
        {images.length > 1 && (
          <>
            <CarouselNav
              position="left"
              onClick={() =>
                setCurrentImageIdx(
                  currentImageIdx === 0
                    ? images.length - 1
                    : currentImageIdx - 1,
                )
              }
            >
              ‹
            </CarouselNav>
            <CarouselNav
              position="right"
              onClick={() =>
                setCurrentImageIdx(
                  currentImageIdx === images.length - 1
                    ? 0
                    : currentImageIdx + 1,
                )
              }
            >
              ›
            </CarouselNav>
          </>
        )}
      </CarouselWrapper>

      <CardBody>
        <VenueTitleRow>
          <VenueTitleLink href={fields["URL"]} target="_blank" rel="noreferrer">
            <h3>{fields["Venue name"]}</h3>
          </VenueTitleLink>
        </VenueTitleRow>

        <VenueAddress>
          {fields["Full address"] || "No address supplied."}
        </VenueAddress>

        <CommentsSection>
          <CommentsTitle>Discussion Feed</CommentsTitle>
          <CommentsStream>
            {commentsLoading ? (
              <StatusMessage>Comments loading...</StatusMessage>
            ) : comments.length === 0 ? (
              <StatusMessage>No notes added yet.</StatusMessage>
            ) : (
              comments.map((comment, index) => (
                <CommentBubble key={index}>
                  <CommentMeta>{comment.author?.name || "User"}:</CommentMeta>
                  <CommentText>{comment.text}</CommentText>
                </CommentBubble>
              ))
            )}
          </CommentsStream>

          {!commentsLoading && (
            <CommentPortal>
              {!showCommentForm ? (
                <AddCommentButton
                  type="button"
                  onClick={() => setShowCommentForm(true)}
                >
                  Add comment
                </AddCommentButton>
              ) : (
                <CommentForm onSubmit={handleCommentSubmit}>
                  <CommentInput
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Add a verified comment..."
                    name="commentText"
                    required
                  />
                  <CommentSubmit type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </CommentSubmit>
                </CommentForm>
              )}
              {submitStatus && <StatusMessage>{submitStatus}</StatusMessage>}
            </CommentPortal>
          )}
        </CommentsSection>
      </CardBody>
    </Card>
  );
}
