import React from "react";
import { useProbability } from "../hooks/useProbability";
import { ProbabilityBar } from "./ProbabilityBar";
import { ProbabilityTable } from "./ProbabilityTable";
import { Box, Paper } from "@mui/material";

export const ResultsView = (props: ReturnType<typeof useProbability>) => {
  const { response } = props;

  const calculateWinPercentage = React.useCallback(
    (probability: number, decimals: number) => {
      const percentage = probability * 100;
      const parsed = parseFloat(percentage.toString()).toFixed(decimals);

      return +parsed;
    },
    []
  );

  const currentWinPercentage = calculateWinPercentage(
    response?.probability.winProbability || 0,
    4
  );

  return (
    <React.Fragment>
      <Paper variant="elevation" elevation={15}>
        <Box p={4}>
          <ProbabilityBar winPercentage={currentWinPercentage} />
        </Box>
      </Paper>
      <Paper variant="elevation" elevation={15}>
        <Box p={4}>
          <ProbabilityTable calculateWinPercentage={calculateWinPercentage} />
        </Box>
      </Paper>
    </React.Fragment>
  );
};
