import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix broken default marker icons in Vite builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const GRAY_400 = "#ced4da";

const PIN_SVG = (color, size) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size[0]}" height="${size[1]}">
    <path d="M12 0C5.372 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z"
      fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4" fill="white"/>
  </svg>
`;

const defaultIcon = L.divIcon({
  className: "",
  html: PIN_SVG("#339af0", [24, 36]),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  tooltipAnchor: [0, -36],
});

const highlightedIcon = L.divIcon({
  className: "",
  html: PIN_SVG(GRAY_400, [30, 45]),
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  tooltipAnchor: [0, -45],
});

// Handles auto-fitting bounds on fitKey changes and reporting user-initiated map moves
function MapController({ venues, fitKey, onBoundsChange }) {
  const map = useMap();
  const skipNextMoveRef = useRef(false);
  const boundsTimerRef = useRef(null);

  useEffect(() => {
    const points = venues.map((v) => [
      v.fields["Latitude"],
      v.fields["Longitude"],
    ]);
    if (points.length > 0) {
      skipNextMoveRef.current = true;
      try {
        map.fitBounds(points, { padding: [20, 20], maxZoom: 14 });
      } catch (e) {
        skipNextMoveRef.current = false;
      }
    }
  }, [fitKey]);

  useMapEvents({
    moveend() {
      if (skipNextMoveRef.current) {
        skipNextMoveRef.current = false;
        return;
      }
      const b = map.getBounds();
      const bounds = {
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      };
      clearTimeout(boundsTimerRef.current);
      boundsTimerRef.current = setTimeout(() => onBoundsChange(bounds), 1500);
    },
  });

  return null;
}

export default function MapPanel({
  venues,
  hoveredVenueId,
  onPinHover,
  onPinClick,
  onBoundsChange,
  onShowAll,
  fitKey,
  isBoundsFiltered,
}) {
  const venuesWithCoords = venues.filter(
    (v) => v.fields["Latitude"] != null && v.fields["Longitude"] != null,
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController
          venues={venuesWithCoords}
          fitKey={fitKey}
          onBoundsChange={onBoundsChange}
        />
        {venuesWithCoords.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.fields["Latitude"], venue.fields["Longitude"]]}
            icon={venue.id === hoveredVenueId ? highlightedIcon : defaultIcon}
            eventHandlers={{
              mouseover: () => onPinHover(venue.id),
              mouseout: () => onPinHover(null),
              click: () => onPinClick(venue.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -36]}>
              {venue.fields["Venue name"]}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      {isBoundsFiltered && (
        <button
          onClick={onShowAll}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 1000,
            padding: "8px 12px",
            backgroundColor: "white",
            border: "2px solid #ccc",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            lineHeight: 1,
          }}
        >
          Show all venues
        </button>
      )}
    </div>
  );
}
