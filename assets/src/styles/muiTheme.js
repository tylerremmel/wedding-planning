import { createTheme } from "@mui/material/styles";
import { FONT_BODY } from "./stitches";

export const muiTheme = createTheme({
  typography: {
    fontFamily: FONT_BODY,
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
