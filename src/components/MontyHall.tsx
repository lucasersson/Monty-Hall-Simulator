import React from "react";
import { InputView } from "./InputView";
import { ResultsView } from "./ResultsView";
import { InfoView } from "./InfoView";
import { MontyHallPaper } from "../layout/MontyHallPaper";
import { ResultsTable } from "./ResultsTable";
import { useProbability } from "../hooks/useProbability";
import { Box, Stack } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { resultsRecoilState } from "../recoil_state";

export const MontyHall = () => {
  const [simulationResponse, setSimulationResponse] = React.useState<
    ReturnType<typeof useProbability>
  >({ response: undefined, loading: false, error: undefined });
  const setResultsState = useSetRecoilState(resultsRecoilState);

  React.useEffect(() => {
    return () => {
      setResultsState([]);
    };
  }, [setResultsState]);

  return (
    <React.Fragment>
      <Box padding={4} width="100vw" display="flex" justifyContent="center">
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
            <ResultsTable />
          </MontyHallPaper>
        </Stack>
      </Box>
    </React.Fragment>
  );
};
