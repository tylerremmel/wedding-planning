import React, { useEffect, useRef, useState } from "react";
import {
  fetchRecordComments,
  submitComment,
  submitReaction,
} from "../utils/airtableApi";
import { clearSession, getUserToken } from "../utils/airtableAuth";
import {
  Card,
  CarouselWrapper,
  CarouselImage,
  CarouselNav,
  CardBody,
  VenueTitleRow,
  VenueTitleLink,
  VenueAddress,
  Button,
  Icon,
  VenueVibe,
  InnerDrawer,
  DrawerCloseButton,
  DrawerVenueName,
  DrawerLinksRow,
  DrawerContactInfoRow,
  DrawerContactInfo,
  DrawerBody,
  DrawerImageGrid,
  DrawerImageWrapper,
  DrawerImageSkeleton,
  DrawerImageEl,
} from "./VenueCard.stitches";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLink } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";
import VenueComments from "./VenueComments";

function ImageWithLoader({ src, alt, placeholderDataUri }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <DrawerImageWrapper>
      {!loaded && <DrawerImageSkeleton />}
      <DrawerImageEl
        src={src}
        alt={alt}
        loading="lazy"
        css={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = placeholderDataUri;
          setLoaded(true);
        }}
      />
    </DrawerImageWrapper>
  );
}

export default function VenueCard({
  record,
  userToken,
  userEmail = null,
  shouldLoadComments = false,
  onCommentsLoaded = () => {},
  isHovered = false,
  scrollTo = false,
  openDrawer = false,
  onDrawerClose = () => {},
  onCardHover = () => {},
}) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reactionStatus, setReactionStatus] = useState("");
  const [isReacting, setIsReacting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localReactions, setLocalReactions] = useState(() =>
    deriveActiveReactions(record.fields, userEmail),
  );
  const [localCounts, setLocalCounts] = useState(() =>
    deriveReactionCounts(record.fields),
  );

  const fields = record.fields;
  const effectiveUserToken = userToken || getUserToken();
  const canReact = Boolean(effectiveUserToken);
  let images = [];
  try {
    images = JSON.parse(fields["Images JSON"] || "[]");
  } catch (e) {
    images = [];
  }
  const svgPlaceholder = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23e9ecef'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='Arial, sans-serif' font-size='24'>Image Unavailable</text></svg>`;
  const placeholderDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgPlaceholder)}`;
  if (images.length === 0) {
    images = [placeholderDataUri];
  }

  const [commentsLoaded, setCommentsLoaded] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setLocalReactions(deriveActiveReactions(record.fields, userEmail));
    setLocalCounts(deriveReactionCounts(record.fields));
  }, [record.fields, userEmail]);

  const isReactionActive = (reactionType) => localReactions.has(reactionType);

  useEffect(() => {
    let cancelled = false;
    let loadSucceeded = false;

    async function loadComments() {
      setCommentsLoading(true);
      const token = userToken || getUserToken();
      const maxAttempts = 3;
      let attempt = 0;
      let lastError = null;

      while (attempt < maxAttempts && !cancelled) {
        try {
          const payload = await fetchRecordComments(record.id, token);
          if (!cancelled) {
            setComments(payload.comments || []);
            loadSucceeded = true;
          }
          break;
        } catch (err) {
          lastError = err;
          if (err && err.isAuthError) {
            if (!cancelled) {
              setComments([]);
            }
            clearSession();
            return;
          }

          const isRateLimit =
            Boolean(err && err.isRateLimit) ||
            /rate limited|too many requests/i.test(err?.message || "");

          attempt += 1;
          if (cancelled || !isRateLimit || attempt >= maxAttempts) {
            console.debug("Failed to load comments:", err);
            if (!cancelled) {
              setComments([]);
            }
            break;
          }

          const delay = 250 * Math.pow(2, attempt - 1);
          await sleep(delay);
        }
      }

      if (!cancelled) {
        setCommentsLoading(false);
        if (loadSucceeded && !commentsLoaded) {
          setCommentsLoaded(true);
          try {
            onCommentsLoaded(record.id);
          } catch (e) {
            console.debug("onCommentsLoaded callback failed", e);
          }
        }
      }

      if (!loadSucceeded && lastError && !cancelled) {
        console.debug("Comment loading failed after retries:", lastError);
      }
    }

    if (shouldLoadComments && !commentsLoaded) {
      loadComments();
    }

    return () => {
      cancelled = true;
    };
  }, [
    record.id,
    userToken,
    shouldLoadComments,
    commentsLoaded,
    onCommentsLoaded,
  ]);

  async function handleCommentSubmit(event) {
    event.preventDefault();
    const trimmedText = commentText.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    setSubmitStatus("Posting comment...");

    const token = userToken || getUserToken();
    const maxAttempts = 5;

    try {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          await submitComment(record.id, trimmedText, token);
          setCommentText("");
          setShowCommentForm(false);
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const payload = await fetchRecordComments(record.id, token);
            setComments(payload.comments || []);
          } catch {
            // Comment posted — refresh failed, user will see it on next load
          }
          setSubmitStatus("Success!");
          setTimeout(() => setSubmitStatus(""), 3000);
          return;
        } catch (err) {
          if (err && err.isRateLimit && attempt < maxAttempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          throw err;
        }
      }
    } catch (err) {
      if (err && err.isRateLimit) {
        setSubmitStatus("Too many requests — please try again in a moment.");
      } else if (err && err.isAuthError) {
        clearSession();
        setSubmitStatus("Session expired. Please log in again.");
      } else {
        setSubmitStatus(`Error: ${err.message || "Unable to submit comment."}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReactionClick(reactionType) {
    if (isReacting) return;

    const token = userToken || getUserToken();
    if (!token) {
      setReactionStatus("Please sign in before reacting.");
      return;
    }

    setIsReacting(true);
    setReactionStatus(`Recording ${reactionType.replace(/_/g, " ")}...`);

    const maxAttempts = 5;

    try {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const result = await submitReaction(record.id, reactionType, token);
          setLocalReactions((current) => {
            const next = new Set(current);
            if (result?.active === false) {
              next.delete(reactionType);
            } else {
              next.add(reactionType);
            }
            return next;
          });
          setLocalCounts((prev) => ({
            ...prev,
            [reactionType]:
              result?.active === false
                ? Math.max(0, prev[reactionType] - 1)
                : prev[reactionType] + 1,
          }));
          setReactionStatus("Verified reaction recorded.");
          setTimeout(() => setReactionStatus(""), 3000);
          return;
        } catch (err) {
          if (err && err.isRateLimit && attempt < maxAttempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          throw err;
        }
      }
    } catch (err) {
      const errorMessage = err?.message || "Unable to record reaction.";

      if (err && err.isAuthError) {
        setReactionStatus("Session expired. Please log in again.");
      } else if (err && err.isRateLimit) {
        setReactionStatus(
          "Too many requests — please wait a moment and try again.",
        );
      } else if (
        /missing userToken|missing venueId|missing type/i.test(errorMessage)
      ) {
        setReactionStatus(`Unable to record reaction: ${errorMessage}`);
      } else {
        setReactionStatus(`Error sending reaction: ${errorMessage}`);
      }
    } finally {
      setIsReacting(false);
    }
  }

  function normalizeReactionName(value) {
    if (!value && value !== 0) return null;
    const normalized = String(value)
      .trim()
      .toLowerCase()
      .replace(/[-\s]+/g, "_");

    switch (normalized) {
      case "hearts":
      case "love":
      case "loved":
      case "favorite":
      case "favourite":
        return "heart";
      case "thumbs_up":
      case "thumbsup":
      case "thumbs_up_reaction":
      case "thumbs-up":
      case "like":
      case "liked":
        return "thumbs_up";
      case "thumbs_down":
      case "thumbsdown":
      case "thumbs_down_reaction":
      case "thumbs-down":
      case "dislike":
      case "disliked":
        return "thumbs_down";
      default:
        return normalized;
    }
  }

  function deriveReactionCounts(fieldsToInspect) {
    const counts = { heart: 0, thumbs_up: 0, thumbs_down: 0 };
    const allReactions = fieldsToInspect["All reactions"];
    if (allReactions && typeof allReactions === "string") {
      allReactions.split(",").forEach((entry) => {
        const pipeIdx = entry.indexOf("|");
        if (pipeIdx === -1) return;
        const type = entry.slice(pipeIdx + 1).trim();
        if (type in counts) counts[type]++;
      });
    }
    return counts;
  }

  function deriveActiveReactions(fieldsToInspect, currentUserEmail) {
    const allReactions = fieldsToInspect["All reactions"];
    if (allReactions && typeof allReactions === "string" && currentUserEmail) {
      const active = new Set();
      allReactions.split(",").forEach((entry) => {
        const pipeIdx = entry.indexOf("|");
        if (pipeIdx === -1) return;
        const email = entry.slice(0, pipeIdx).trim();
        const type = entry.slice(pipeIdx + 1).trim();
        if (
          email === currentUserEmail &&
          ["heart", "thumbs_up", "thumbs_down"].includes(type)
        ) {
          active.add(type);
        }
      });
      return active;
    }

    const reactionFields = [
      "Venue reactions",
      "Reaction types",
      "Reactions",
      "My reactions",
      "User reactions",
      "Current user reactions",
      "My reaction",
      "User reaction",
      "Reaction type",
      "User reaction type",
    ];

    const active = [];

    reactionFields.forEach((fieldName) => {
      const value = fieldsToInspect[fieldName];
      if (Array.isArray(value)) {
        active.push(...value);
      } else if (typeof value === "string" && value.trim()) {
        active.push(...value.split(/\s*,\s*/));
      }
    });

    const booleanReactionFields = {
      heart: ["Heart", "Heart reaction", "Loved", "Favorite", "Favourite"],
      thumbs_up: ["Thumbs up", "Thumbs up reaction", "Like", "Liked"],
      thumbs_down: [
        "Thumbs down",
        "Thumbs down reaction",
        "Dislike",
        "Disliked",
      ],
    };

    Object.entries(booleanReactionFields).forEach(([reactionType, fields]) => {
      fields.forEach((fieldName) => {
        const value = fieldsToInspect[fieldName];
        if (
          value === true ||
          value === 1 ||
          value === "1" ||
          value === "true" ||
          value === "True" ||
          value === "yes" ||
          value === "Yes"
        ) {
          active.push(reactionType);
        }
      });
    });

    return new Set(
      active
        .map(normalizeReactionName)
        .filter((reactionType) =>
          ["heart", "thumbs_up", "thumbs_down"].includes(reactionType),
        ),
    );
  }

  const currentImage = images[currentImageIdx];

  const [internalOpen, setInternalOpen] = useState(false);
  const cardRef = useRef(null);

  const effectiveOpen = openDrawer || internalOpen;

  const handleDrawerClose = () => {
    setInternalOpen(false);
    onDrawerClose();
  };

  useEffect(() => {
    if (scrollTo && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollTo]);

  return (
    <Card
      ref={cardRef}
      highlighted={isHovered}
      onMouseEnter={() => onCardHover(record.id)}
      onMouseLeave={() => onCardHover(null)}
      onClick={(e) => {
        if (e.currentTarget.contains(e.target)) setInternalOpen(true);
      }}
    >
      <CarouselWrapper>
        <CarouselImage
          src={currentImage}
          alt={fields["Venue name"]}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = placeholderDataUri;
          }}
        />
        {images.length > 1 && (
          <>
            <CarouselNav
              position="left"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIdx(
                  currentImageIdx === 0
                    ? images.length - 1
                    : currentImageIdx - 1,
                );
              }}
            >
              ‹
            </CarouselNav>
            <CarouselNav
              position="right"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIdx(
                  currentImageIdx === images.length - 1
                    ? 0
                    : currentImageIdx + 1,
                );
              }}
            >
              ›
            </CarouselNav>
          </>
        )}
      </CarouselWrapper>

      <CardBody>
        <VenueTitleRow>
          <VenueTitleLink>
            <h3>{fields["Venue name"]}</h3>
          </VenueTitleLink>
        </VenueTitleRow>

        {fields["Vibe check"] && (
          <VenueVibe>{fields["Vibe check"] || ""}</VenueVibe>
        )}

        <VenueAddress>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>{" "}
          {fields["City"] || ""}
          {fields["City"] && fields["State"] ? ", " : ""}
          {fields["State"] || ""}
        </VenueAddress>

        <VenueComments
          variant="card"
          showCommentForm={showCommentForm}
          setShowCommentForm={setShowCommentForm}
          commentText={commentText}
          setCommentText={setCommentText}
          isSubmitting={isSubmitting}
          handleCommentSubmit={handleCommentSubmit}
          submitStatus={submitStatus}
          isReacting={isReacting}
          canReact={canReact}
          isReactionActive={isReactionActive}
          localCounts={localCounts}
          handleReactionClick={handleReactionClick}
          reactionStatus={reactionStatus}
          commentsLoading={commentsLoading}
          comments={comments}
        />
      </CardBody>
      <Drawer anchor="left" open={effectiveOpen} onClose={handleDrawerClose}>
        <InnerDrawer onClick={(e) => e.stopPropagation()}>
          <DrawerCloseButton
            onClick={handleDrawerClose}
            aria-label="Close drawer"
          >
            ✕
          </DrawerCloseButton>
          <DrawerVenueName>{fields["Venue name"]}</DrawerVenueName>
          <DrawerContactInfo>
            {fields["Full address"] && (
              <DrawerContactInfoRow>
                <Icon>
                  <FaMapMarkerAlt />
                </Icon>{" "}
                {fields["Full address"]}
              </DrawerContactInfoRow>
            )}

            {fields["Phone number"] && (
              <DrawerContactInfoRow>
                <Icon>
                  <FaPhone />
                </Icon>{" "}
                {fields["Phone number"]}
              </DrawerContactInfoRow>
            )}
            {fields["Email"] && (
              <DrawerContactInfoRow>
                <Icon>
                  <FaEnvelope />
                </Icon>{" "}
                <a href={`mailto:${fields["Email"]}`}>{fields["Email"]}</a>
              </DrawerContactInfoRow>
            )}
          </DrawerContactInfo>

          <DrawerLinksRow>
            {fields["URL"] && (
              <Button
                as="a"
                variant="gray"
                size="compact"
                href={fields["URL"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon>
                  <FaLink />
                </Icon>{" "}
                Link 1
              </Button>
            )}
            {fields["URL 2"] && (
              <Button
                as="a"
                variant="gray"
                size="compact"
                href={fields["URL 2"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon>
                  <FaLink />
                </Icon>{" "}
                Link 2
              </Button>
            )}
          </DrawerLinksRow>

          <VenueComments
            variant="drawer"
            showCommentForm={showCommentForm}
            setShowCommentForm={setShowCommentForm}
            commentText={commentText}
            setCommentText={setCommentText}
            isSubmitting={isSubmitting}
            handleCommentSubmit={handleCommentSubmit}
            submitStatus={submitStatus}
            isReacting={isReacting}
            canReact={canReact}
            isReactionActive={isReactionActive}
            localCounts={localCounts}
            handleReactionClick={handleReactionClick}
            reactionStatus={reactionStatus}
            commentsLoading={commentsLoading}
            comments={comments}
          />

          <DrawerBody>
            {fields["Vibe check"] && (
              <p>
                <strong>Vibe check:</strong> {fields["Vibe check"]}
              </p>
            )}

            {fields["Type of venue"]?.length > 0 && (
              <p>
                <strong>Type of venue:</strong>{" "}
                {fields["Type of venue"].join(", ")}
              </p>
            )}
            {fields["Reception options"]?.length > 0 && (
              <p>
                <strong>Reception options:</strong>{" "}
                {fields["Reception options"].join(", ")}
              </p>
            )}
            {fields["Options included"]?.length > 0 && (
              <p>
                <strong>Options included:</strong>{" "}
                {fields["Options included"].join(", ")}
              </p>
            )}

            {fields["Capacity"] && (
              <p>
                <strong>Capacity:</strong> {fields["Capacity"]}
              </p>
            )}
            {fields["Capacity notes"] && (
              <p>
                <strong>Capacity notes:</strong> {fields["Capacity notes"]}
              </p>
            )}
            {fields["Ideal season(s)"]?.length > 0 && (
              <p>
                <strong>Ideal seasons:</strong>{" "}
                {fields["Ideal season(s)"].join(", ")}
              </p>
            )}
            {fields["Pet friendly?"] && (
              <p>
                <strong>Pet friendly:</strong> Yes
              </p>
            )}
            {fields["Pet notes"] && (
              <p>
                <strong>Pet notes:</strong> {fields["Pet notes"]}
              </p>
            )}

            {fields["Catering included?"] && (
              <p>
                <strong>Catering included:</strong> Yes
              </p>
            )}
            {fields["Catering notes"] && (
              <p>
                <strong>Catering notes:</strong> {fields["Catering notes"]}
              </p>
            )}
            {fields["Bar package"] && (
              <p>
                <strong>Bar package:</strong> {fields["Bar package"]}
              </p>
            )}

            {fields["Rental fee"] != null && (
              <p>
                <strong>Rental fee:</strong>{" "}
                {"$" + Number(fields["Rental fee"]).toLocaleString()}
              </p>
            )}
            {fields["Per-person cost"] != null && (
              <p>
                <strong>Per-person cost:</strong>{" "}
                {"$" + Number(fields["Per-person cost"]).toLocaleString()}
              </p>
            )}
            {fields["Minimum spend"] != null && (
              <p>
                <strong>Minimum spend:</strong>{" "}
                {"$" + Number(fields["Minimum spend"]).toLocaleString()}
              </p>
            )}
            {fields["Estimated total cost"] != null && (
              <p>
                <strong>Estimated total cost:</strong>{" "}
                {"$" + Number(fields["Estimated total cost"]).toLocaleString()}
              </p>
            )}

            {fields["Deposit info"] && (
              <p>
                <strong>Deposit info:</strong> {fields["Deposit info"]}
              </p>
            )}
            {fields["Payment schedule"] && (
              <p>
                <strong>Payment schedule:</strong> {fields["Payment schedule"]}
              </p>
            )}
            {fields["Cancellation policy"] && (
              <p>
                <strong>Cancellation policy:</strong>{" "}
                {fields["Cancellation policy"]}
              </p>
            )}

            {fields["Extras/notes"] && (
              <p>
                <strong>Extras/notes:</strong> {fields["Extras/notes"]}
              </p>
            )}
          </DrawerBody>
          {images.filter((url) => url !== placeholderDataUri).length > 0 && (
            <DrawerImageGrid>
              {images
                .filter((url) => url !== placeholderDataUri)
                .map((url, idx) => (
                  <ImageWithLoader
                    key={idx}
                    src={url}
                    alt={`${fields["Venue name"]} photo ${idx + 1}`}
                    placeholderDataUri={placeholderDataUri}
                  />
                ))}
            </DrawerImageGrid>
          )}
        </InnerDrawer>
      </Drawer>
    </Card>
  );
}
