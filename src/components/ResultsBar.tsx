import React from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

export interface IResultsBar {
  winPercentage?: number;
}

export const ResultsBar = (props: IResultsBar) => {
  const { winPercentage } = props;

  return (
    <React.Fragment>
      <Stack
        role="resultsBar"
        direction="row"
        spacing={4}
        display="flex"
        alignItems="center"
      >
        <Box width="90%">
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={winPercentage || 0}
          />
        </Box>
        <Typography sx={{ opacity: 0.8 }}>
          {Math.round(winPercentage || 0)}%
        </Typography>
      </Stack>
    </React.Fragment>
  );
};
