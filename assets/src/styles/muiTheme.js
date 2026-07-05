import { createTheme } from "@mui/material/styles";
import { theme } from "./stitches";

export const muiTheme = createTheme({
  typography: {
    fontFamily: `${theme.fonts.meta}`,
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 16,
        },
      },
    },
  },
});
