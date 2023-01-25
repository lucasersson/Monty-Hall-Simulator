import React from "react";
import { Paper } from "@mui/material";

export const MontyHallPaper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Paper variant="elevation" elevation={15}>
      {children}
    </Paper>
  );
};
