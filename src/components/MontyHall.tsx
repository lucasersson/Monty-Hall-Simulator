import React from "react";
import { InputView } from "./InputView";
import { ResultsView } from "./ResultsView";
import { InfoView } from "./InfoView";
import { MontyHallPaper } from "../layout/MontyHallPaper";
import { ResultsTable } from "./ResultsTable";
import { useProbability } from "../hooks/useProbability";
import { calculateWinPercentage } from "../utils";
import { Box, Stack } from "@mui/material";

export const MontyHall = () => {
  const [simulationResponse, setSimulationResponse] = React.useState<
    ReturnType<typeof useProbability>
  >({ response: undefined, loading: false, error: undefined });

  return (
    <React.Fragment>
      <Box padding={10} width="100vw" display="flex" justifyContent="center">
        <Stack direction="row" spacing={3}>
          <Stack direction="column" spacing={3}>
            <MontyHallPaper>
              <InfoView />
            </MontyHallPaper>
            <MontyHallPaper>
              <InputView setSimulationResponse={setSimulationResponse} />
            </MontyHallPaper>
            <MontyHallPaper>
              <ResultsView {...simulationResponse} />
            </MontyHallPaper>
          </Stack>
          <MontyHallPaper>
            <ResultsTable calculateWinPercentage={calculateWinPercentage} />
          </MontyHallPaper>
        </Stack>
      </Box>
    </React.Fragment>
  );
};
