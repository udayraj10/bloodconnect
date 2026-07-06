import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#e10600",
      light: "#ffe2e2",
      dark: "#c80500",
      contrastText: "#ffffff",
    },

    background: {
      default: "#eeeeee",
      paper: "#ffffff",
    },

    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },

    divider: "#cbd5e1",
  },

  typography: {
    fontFamily: "Figtree, Arial, sans-serif",

    h1: {
      fontWeight: 700,
      color: "#0f172a",
    },
    h2: {
      fontWeight: 700,
      color: "#0f172a",
    },
    h3: {
      fontWeight: 600,
      color: "#0f172a",
    },
    h4: {
      fontWeight: 600,
      color: "#0f172a",
    },
    h5: {
      fontWeight: 600,
      color: "#0f172a",
    },
    h6: {
      fontWeight: 600,
      color: "#0f172a",
    },

    body1: {
      color: "#0f172a",
    },

    body2: {
      color: "#0f172a",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,

          "&.Mui-disabled": {
            backgroundColor: "#bbb",
            color: "#444",
          },
        },
      },

      variants: [
        {
          props: { variant: "outlined" },
          style: {
            "&.Mui-disabled": {
              backgroundColor: "transparent",
              borderColor: "#aaa",
              color: "#555",
            },
          },
        },
      ],
    },

    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: "inherit",
        },
        subheader: {
          color: "inherit",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "inherit",
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },

    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888888",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888888",
            borderWidth: "1px",
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "transparent !important",
          },

          "& .MuiDataGrid-cell": {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          "& .MuiDataGrid-columnHeader": {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "rgba(0, 0, 0, 0.2) !important",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#888888",
          fontSize: "0.9rem",
          "&.Mui-focused": {
            color: "#888888",
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#eeeeee",
          color: "#0f172a",
        },
      },
    },
  },
})

export default theme
