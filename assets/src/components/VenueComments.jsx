import React, { useEffect, useRef, useState } from "react";
import {
  CommentsSection,
  DrawerCommentsSection,
  CommentPortal,
  CommentActions,
  CommentForm,
  CommentInputActions,
  CommentsStream,
  CommentsListWrapper,
  CommentBubbleWrapper,
  CommentBubble,
  CommentMeta,
  CommentText,
  CommentName,
  Button,
  StatusLine,
  StatusMessage,
  StatusSeparator,
} from "./VenueCard.stitches";
import { Icon } from "./shared.stitches";
import {
  MdOutlineAddComment,
  MdOutlineThumbDown,
  MdThumbDown,
  MdOutlineThumbUp,
  MdThumbUp,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";

function getAvatarSrc(authorName) {
  const base = window.SITE_BASEURL || "";
  const first = (authorName || "").split(" ")[0].toLowerCase();
  const file = first === "tyler" || first === "jenna" ? first : "default";
  return `${base}/assets/img/avatars/${file}.png`;
}

import TextField from "@mui/material/TextField";

export default function VenueComments({
  variant = "card",
  showCommentForm,
  setShowCommentForm,
  commentText,
  setCommentText,
  isSubmitting,
  handleCommentSubmit,
  submitStatus,
  isReacting,
  canReact,
  isReactionActive,
  localCounts,
  handleReactionClick,
  reactionStatus,
  commentsLoading,
  commentsLoaded,
  comments,
}) {
  const Wrapper =
    variant === "drawer" ? DrawerCommentsSection : CommentsSection;

  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const commentsListRef = useRef(null);

  const commentsStatus = commentsLoading
    ? "Comments loading..."
    : commentsLoaded
      ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
      : null;
  const statusParts = [submitStatus, reactionStatus, commentsStatus].filter(
    Boolean,
  );

  useEffect(() => {
    const el = commentsListRef.current;
    if (!el) return;
    setHasOverflow(el.scrollHeight > 100);
  }, [comments]);

  return (
    <Wrapper>
      <CommentPortal>
        {!showCommentForm ? (
          <CommentActions>
            <Button
              variant="blue"
              size="compact"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentForm(true);
              }}
            >
              <Icon>
                <MdOutlineAddComment />
              </Icon>{" "}
              Add note
            </Button>
            <Button
              variant="red"
              highlighted={isReactionActive("heart")}
              size="compact"
              type="button"
              disabled={isReacting || !canReact}
              aria-pressed={isReactionActive("heart")}
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick("heart");
              }}
            >
              <Icon>
                {isReactionActive("heart") ? (
                  <MdFavorite />
                ) : (
                  <MdFavoriteBorder />
                )}
              </Icon>{" "}
              {localCounts.heart}
            </Button>
            <Button
              variant="gray"
              highlighted={isReactionActive("thumbs_up")}
              size="compact"
              type="button"
              disabled={isReacting || !canReact}
              aria-pressed={isReactionActive("thumbs_up")}
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick("thumbs_up");
              }}
            >
              <Icon>
                {isReactionActive("thumbs_up") ? (
                  <MdThumbUp />
                ) : (
                  <MdOutlineThumbUp />
                )}
              </Icon>{" "}
              {localCounts.thumbs_up}
            </Button>
            <Button
              variant="gray"
              highlighted={isReactionActive("thumbs_down")}
              size="compact"
              type="button"
              disabled={isReacting || !canReact}
              aria-pressed={isReactionActive("thumbs_down")}
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick("thumbs_down");
              }}
            >
              <Icon>
                {isReactionActive("thumbs_down") ? (
                  <MdThumbDown />
                ) : (
                  <MdOutlineThumbDown />
                )}
              </Icon>{" "}
              {localCounts.thumbs_down}
            </Button>
          </CommentActions>
        ) : (
          <CommentForm onSubmit={handleCommentSubmit}>
            <TextField
              multiline
              size="small"
              rows={2}
              label="Add a note"
              name="commentText"
              required
              fullWidth
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <CommentInputActions>
              <Button
                variant="gray"
                size="compact"
                type="button"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentText("");
                  setShowCommentForm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="blue"
                size="compact"
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => e.stopPropagation()}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </CommentInputActions>
          </CommentForm>
        )}
        {statusParts.length > 0 && (
          <StatusLine>
            {statusParts.map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <StatusSeparator>·</StatusSeparator>}
                <StatusMessage>{part}</StatusMessage>
              </React.Fragment>
            ))}
          </StatusLine>
        )}
      </CommentPortal>
      <CommentsStream>
        {!commentsLoading && comments.length > 0 && (
          <>
            <CommentsListWrapper
              ref={commentsListRef}
              collapsed={hasOverflow && !expanded}
            >
              {[...comments].reverse().map((comment, index) => (
                <CommentBubbleWrapper key={comment.id ?? index}>
                  <Icon size="200" style={{ marginTop: "4px" }}>
                    <img
                      src={getAvatarSrc(comment.author?.name)}
                      alt=""
                      style={{
                        objectFit: "contain",
                        verticalAlign: "middle",
                      }}
                    />
                  </Icon>
                  <CommentBubble>
                    <CommentMeta>
                      <CommentName>
                        {comment.author?.name?.split(" ")[0] || "User"}:
                      </CommentName>
                    </CommentMeta>
                    <CommentText>{comment.text}</CommentText>
                  </CommentBubble>
                </CommentBubbleWrapper>
              ))}
            </CommentsListWrapper>
            {hasOverflow && (
              <Button
                variant="white"
                size="compact"
                type="button"
                style={{ marginTop: "8px", justifySelf: "flex-start" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((v) => !v);
                }}
              >
                {expanded ? "Collapse" : "See more"}
              </Button>
            )}
          </>
        )}
      </CommentsStream>
    </Wrapper>
  );
}
