import React from "react";
import { useProbability } from "../hooks/useProbability";
import { ResultsBar } from "./ResultsBar";
import { ResultsText } from "./ResultsText";
import { calculateWinPercentage } from "../utils";
import { Box } from "@mui/material";

export const ResultsView = (props: ReturnType<typeof useProbability>) => {
  const { response } = props;

  const currentWinPercentage = calculateWinPercentage(
    4,
    response?.probability.winProbability
  );

  return (
    <Box p={4}>
      <ResultsBar winPercentage={currentWinPercentage} />
      <ResultsText {...props} />
    </Box>
  );
};
