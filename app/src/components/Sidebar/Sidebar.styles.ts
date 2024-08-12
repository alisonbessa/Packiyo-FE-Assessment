import { styled } from "@mui/material/styles";
import { Box, ListItem } from "@mui/material";

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? "auto" : 200,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: "width 0.3s ease",
  overflow: "hidden",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

export const SidebarItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed: boolean }>(({ collapsed }) => ({
  cursor: "pointer",
  width: "100%",
  display: "flex",
  justifyContent: collapsed ? "center" : "flex-start",
  paddingLeft: "1rem",
}));
