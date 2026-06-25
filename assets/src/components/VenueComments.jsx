import React from "react";
import {
  CommentsSection,
  DrawerCommentsSection,
  CommentPortal,
  CommentActions,
  CommentForm,
  CommentInputActions,
  CommentsStream,
  CommentBubble,
  CommentMeta,
  CommentText,
  Button,
  Icon,
  StatusMessage,
} from "./VenueCard.stitches";
import {
  MdOutlineAddComment,
  MdOutlineThumbDown,
  MdThumbDown,
  MdOutlineThumbUp,
  MdThumbUp,
  MdFavoriteBorder,
  MdFavorite,
  MdAccountCircle,
} from "react-icons/md";

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
  comments,
}) {
  const Wrapper =
    variant === "drawer" ? DrawerCommentsSection : CommentsSection;

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
                  <MdFavoriteBorder />
                ) : (
                  <MdFavorite />
                )}
              </Icon>{" "}
              {localCounts.heart}
            </Button>
            <Button
              variant={isReactionActive("thumbs_up") ? "blue" : "gray"}
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
        {submitStatus && <StatusMessage>{submitStatus}</StatusMessage>}
        {reactionStatus && <StatusMessage>{reactionStatus}</StatusMessage>}
      </CommentPortal>
      <CommentsStream>
        {commentsLoading ? (
          <StatusMessage>Comments loading...</StatusMessage>
        ) : comments.length === 0 ? null : (
          comments.map((comment, index) => (
            <CommentBubble key={index}>
              <CommentMeta>
                <Icon>
                  <MdAccountCircle />
                </Icon>{" "}
                {comment.author?.name?.split(" ")[0] || "User"}:
              </CommentMeta>
              <CommentText>{comment.text}</CommentText>
            </CommentBubble>
          ))
        )}
      </CommentsStream>
    </Wrapper>
  );
}
