import { styled } from "../styles/stitches";
export { Button } from "./shared.stitches";

export const PageShell = styled("section", {
  maxWidth: "1240px",
  margin: "0 auto",
  padding: "24px 16px 40px",
});

export const HeaderPanel = styled("div", {
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

export const StatusBlock = styled("div", {
  color: "$gray500",
  fontSize: "0.75rem",
  lineHeight: 1.4,
});

export const StatusText = styled("div", {});

export const NumberOfRecordsText = styled("div", {});

export const ErrorText = styled("div", {
  color: "$red800",
});

export const MenuGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  flexShrink: 0,
});

export const StatusGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  flex: 1,
  minWidth: 0,
});

export const SessionWarning = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "0.85rem",
  variants: {
    severity: {
      critical: {
        backgroundColor: "#fff0f0",
        color: "#c92a2a",
      },
      warning: {
        backgroundColor: "#fffbe6",
        color: "#e67700",
      },
    },
  },
});

export const ActionButtons = styled("div", {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  flexShrink: 0,
});

export const ControlPanel = styled("div", {
  display: "grid",
  gap: "28px",
  marginBottom: "24px",
  gridTemplateColumns: "6fr 4fr",
  alignItems: "start",
});

export const LeftPanel = styled("div", {
  display: "grid",
  gap: "28px",
  alignItems: "start",
});

export const RightPanel = styled("div", {
  position: "sticky",
  top: "24px",
  height: "calc(100vh - 48px)",
  borderRadius: "$md",
  overflow: "hidden",
  boxShadow: "$card",
});

export const Input = styled("input", {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "$sm",
  border: "1px solid $gray300",
  fontSize: "0.95rem",
  color: "$gray800",
  backgroundColor: "$white",
});

export const Select = styled("select", {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "$sm",
  border: "1px solid $gray300",
  backgroundColor: "$white",
  fontSize: "0.95rem",
  color: "$gray800",
});

export const GridContainer = styled("div", {
  display: "grid",
  gap: "28px",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  flexGrow: 4,
  paddingBottom: "28px",
});

export const Notification = styled("div", {
  padding: "16px 18px",
  borderRadius: "$md",
  backgroundColor: "$white",
  boxShadow: "$card",
  color: "$gray700",
});
