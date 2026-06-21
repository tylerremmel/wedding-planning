import React from "react";
import {
  CommentsSection,
  DrawerCommentsSection,
  CommentPortal,
  CommentActions,
  CommentForm,
  CommentInput,
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
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

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
  const Wrapper = variant === "drawer" ? DrawerCommentsSection : CommentsSection;

  return (
    <Wrapper>
      <CommentPortal>
        {!showCommentForm ? (
          <CommentActions>
            <Button
              color="blue"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentForm(true);
              }}
            >
              Add note
            </Button>
            <Button
              color={isReactionActive("heart") ? "red" : "gray"}
              type="button"
              disabled={isReacting || !canReact}
              aria-pressed={isReactionActive("heart")}
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick("heart");
              }}
            >
              <Icon>
                {isReactionActive("heart") ? <FaHeart /> : <FaRegHeart />}
              </Icon>{" "}
              {localCounts.heart}
            </Button>
            <Button
              color={isReactionActive("thumbs_up") ? "blue" : "gray"}
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
                  <FaThumbsUp />
                ) : (
                  <FaRegThumbsUp />
                )}
              </Icon>{" "}
              {localCounts.thumbs_up}
            </Button>
            <Button
              color={isReactionActive("thumbs_down") ? "black" : "gray"}
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
                  <FaThumbsDown />
                ) : (
                  <FaRegThumbsDown />
                )}
              </Icon>{" "}
              {localCounts.thumbs_down}
            </Button>
          </CommentActions>
        ) : (
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={commentText}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add a verified comment..."
              name="commentText"
              required
            />
            <CommentInputActions>
              <Button
                color="gray"
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
                color="black"
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
