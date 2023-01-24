import React from "react";
import { useProbability } from "../hooks/useProbability";
import { InputView } from "./InputView";
import { ResultsView } from "./ResultsView";
import { Box, Stack } from "@mui/material";

export const MontyHall = () => {
  const [simulationResponse, setSimulationResponse] = React.useState<
    ReturnType<typeof useProbability>
  >({ response: undefined, loading: false, error: undefined });

  return (
    <React.Fragment>
      <Box padding={10} height="100vh" display="flex" justifyContent="center">
        <Stack direction="column" spacing={3}>
          <InputView setSimulationResponse={setSimulationResponse} />
          <ResultsView {...simulationResponse} />
        </Stack>
      </Box>
    </React.Fragment>
  );
};
