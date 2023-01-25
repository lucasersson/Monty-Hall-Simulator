import React from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

interface IResultsBar {
  winPercentage: number;
}

export const ResultsBar = (props: IResultsBar) => {
  const { winPercentage } = props;

  return (
    <React.Fragment>
      <Stack direction="row" spacing={4} display="flex" alignItems="center">
        <Box width="90%">
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={winPercentage}
          />
        </Box>
        <Typography sx={{ opacity: 0.8 }}>
          {Math.round(winPercentage)}%
        </Typography>
      </Stack>
    </React.Fragment>
  );
};
