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
                  <MdFavorite />
                ) : (
                  <MdFavoriteBorder />
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
          [...comments].reverse().map((comment, index) => (
            <CommentBubble key={comment.id ?? index}>
              <CommentMeta>
                <Icon style={{ top: "-1px" }}>
                  <img
                    src={getAvatarSrc(comment.author?.name)}
                    alt=""
                    style={{
                      width: "1em",
                      height: "1em",
                      objectFit: "cover",
                      verticalAlign: "middle",
                    }}
                  />
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
