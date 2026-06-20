import React, { useEffect, useState, useMemo } from "react";
import { styled } from "../styles/stitches";
import VenueCard from "./VenueCard";
import {
  getUserToken,
  redirectToAirtableOAuth,
  exchangeCodeForToken,
  clearSession,
} from "../utils/airtableAuth";
import { fetchVenueRecords } from "../utils/airtableApi";

const PageShell = styled("section", {
  maxWidth: "1240px",
  margin: "0 auto",
  padding: "24px 16px 40px",
});

const HeaderPanel = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "28px",
  padding: "22px",
  borderRadius: "$lg",
  backgroundColor: "$white",
  boxShadow: "$card",
  "@lg": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const StatusBlock = styled("div", {
  color: "$gray700",
  fontSize: "0.95rem",
  lineHeight: 1.6,
});

const ActionButtons = styled("div", {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
});

const Button = styled("button", {
  padding: "10px 16px",
  borderRadius: "$sm",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  transition: "transform 0.15s ease",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: "$blue500",
        color: "$white",
      },
      danger: {
        backgroundColor: "$red500",
        color: "$white",
      },
      secondary: {
        backgroundColor: "$gray300",
        color: "$gray800",
      },
    },
  },
});

const ControlPanel = styled("div", {
  display: "grid",
  gap: "16px",
  marginBottom: "24px",
  "@lg": {
    gridTemplateColumns: "1fr 280px",
  },
});

const MapPlaceholder = styled("div", {
  minHeight: "220px",
  borderRadius: "$md",
  border: "1px dashed $gray300",
  backgroundColor: "$white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$gray500",
  fontSize: "0.95rem",
});

const FilterGroup = styled("div", {
  display: "grid",
  gap: "12px",
});

const Input = styled("input", {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "$sm",
  border: "1px solid $gray300",
  fontSize: "0.95rem",
  color: "$gray800",
  backgroundColor: "$white",
});

const Select = styled("select", {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "$sm",
  border: "1px solid $gray300",
  backgroundColor: "$white",
  fontSize: "0.95rem",
  color: "$gray800",
});

const GridContainer = styled("div", {
  display: "grid",
  gap: "28px",
  gridTemplateColumns: "1fr",
  "@lg": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
});

const Notification = styled("div", {
  padding: "16px 18px",
  borderRadius: "$md",
  backgroundColor: "$white",
  boxShadow: "$card",
  color: "$gray700",
});

export default function AirtableInterface() {
  const [records, setRecords] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Checking login status...",
  );
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(getUserToken());
  const [errorMessage, setErrorMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get("code");

    if (oauthCode) {
      setStatusMessage("Verifying authentication credentials...");
      exchangeCodeForToken(oauthCode);
      return;
    }

    if (userToken) {
      setStatusMessage("Session authorized. Fetching live dataset...");
      loadRecords();
    } else {
      setStatusMessage(
        "Log in with an approved Airtable account to unlock entries.",
      );
    }
  }, [userToken]);

  async function loadRecords() {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchVenueRecords(userToken);
      if (data.records && data.records.length > 0) {
        setRecords(data.records);
      } else {
        setRecords([]);
      }
    } catch (err) {
      setErrorMessage(err.message || "Unable to fetch records.");
    } finally {
      setLoading(false);
    }
  }

  const filteredRecords = useMemo(() => {
    const normalizedFilter = filterText.toLowerCase().trim();
    return records
      .filter((record) => {
        const name = record.fields["Venue name"] || "";
        const address = record.fields["Full address"] || "";
        return (
          name.toLowerCase().includes(normalizedFilter) ||
          address.toLowerCase().includes(normalizedFilter)
        );
      })
      .sort((a, b) => {
        if (sortKey === "name") {
          return (a.fields["Venue name"] || "").localeCompare(
            b.fields["Venue name"] || "",
          );
        }
        return 0;
      });
  }, [records, filterText, sortKey]);

  return (
    <PageShell>
      <HeaderPanel>
        <StatusBlock>
          <p>{statusMessage}</p>
          {errorMessage && <p style={{ color: "#e03131" }}>{errorMessage}</p>}
        </StatusBlock>

        <ActionButtons>
          {!userToken ? (
            <Button intent="primary" onClick={redirectToAirtableOAuth}>
              Log In with Airtable
            </Button>
          ) : (
            <>
              <Button intent="secondary" onClick={loadRecords}>
                Refresh venues
              </Button>
              <Button intent="danger" onClick={clearSession}>
                Log Out
              </Button>
            </>
          )}
        </ActionButtons>
      </HeaderPanel>

      <ControlPanel>
        <FilterGroup>
          <Input
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
            placeholder="Filter by venue name or address"
            aria-label="Venue search"
          />
          <Select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value)}
            aria-label="Sort venues"
          >
            <option value="name">Sort by name</option>
          </Select>
        </FilterGroup>

        <MapPlaceholder>
          Map placeholder — map integration can be added here later.
        </MapPlaceholder>
      </ControlPanel>

      {loading ? (
        <Notification>Loading venue cards…</Notification>
      ) : filteredRecords.length > 0 ? (
        <GridContainer>
          {filteredRecords.map((record) => (
            <VenueCard key={record.id} record={record} userToken={userToken} />
          ))}
        </GridContainer>
      ) : (
        <Notification>No venues available yet.</Notification>
      )}
    </PageShell>
  );
}
