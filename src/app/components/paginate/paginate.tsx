import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
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

export default function Paginate({
  currentPage,
  totalPages,
  onPageChange,
}: any) {
  const handlePageChange = (event: any, value: any) => {
    onPageChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
}
