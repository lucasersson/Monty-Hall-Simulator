import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { RecoilRoot } from "recoil";
import { MontyHall } from "./components/MontyHall";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RecoilRoot>
        <MontyHall />
      </RecoilRoot>
    </ThemeProvider>
  );
};
