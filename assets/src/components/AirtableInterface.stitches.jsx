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
  color: "$gray700",
  fontSize: "0.95rem",
  lineHeight: 1.6,
});

export const ActionButtons = styled("div", {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
});

export const ControlPanel = styled("div", {
  display: "grid",
  gap: "28px",
  marginBottom: "24px",
  gridTemplateColumns: "6fr 4fr",
});

export const FilterGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "22px",
  borderRadius: "$lg",
  backgroundColor: "$white",
  boxShadow: "$card",
  flexGrow: 0,
});

export const FilterSubGroup = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  width: "100%",
});

export const FilterGroupText = styled("div", {
  fontSize: "0.95rem",
  color: "$gray700",
  fontWeight: 600,
});

export const LeftPanel = styled("div", {
  display: "grid",
  gap: "28px",
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
});

export const Notification = styled("div", {
  padding: "16px 18px",
  borderRadius: "$md",
  backgroundColor: "$white",
  boxShadow: "$card",
  color: "$gray700",
});
