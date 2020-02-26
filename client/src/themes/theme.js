import { createMuiTheme } from "@material-ui/core";
import orange from '@material-ui/core/colors/orange';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: orange[800],
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6",
  overrides: {
    MuiPickersDay: {
      day: {
        backgroundColor: orange[100],
        color: orange[800],
        "&:hover": {
          "backgroundColor": orange[200]
        }
      },
      daySelected: {
        backgroundColor: orange[800],
        "&:hover": {
          "backgroundColor": orange[800]
        }
      },
      current: {
        color: orange[800],
      },
      dayDisabled: {
        backgroundColor: "#fff",
        color: "#bdbdbd"
      }
    },
  }
});
