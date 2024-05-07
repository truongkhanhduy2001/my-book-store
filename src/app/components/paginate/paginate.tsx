import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Theme
const theme = createTheme({
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          // Thay đổi CSS cho Stack
          display: "flex",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
    },
  },
});

export default function Paginate() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={2}></Stack>
        <Pagination count={2} color="primary" />
      </div>
    </ThemeProvider>
  );
}
