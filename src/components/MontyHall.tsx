import React from "react";
import { InputView } from "./InputView";
import { ResultsView } from "./ResultsView";
import { InfoView } from "./InfoView";
import { MontyHallPaper } from "../layout/MontyHallPaper";
import { ResultsTable } from "./ResultsTable";
import { useProbability } from "../hooks/useProbability";
import { Box, Stack } from "@mui/material";
import { Decision, IRequest } from "../types";

export const MontyHall = () => {
  const [request, setRequest] = React.useState<IRequest>();
  const [trials, setTrials] = React.useState(5);
  const [decision, setDecision] = React.useState(Decision.Keep);

  const actions = {
    request,
    setRequest,
    trials,
    setTrials,
    decision,
    setDecision,
  };

  const simulationResponse = useProbability(request);
  const { loading, error } = simulationResponse;

  return (
    <React.Fragment>
      <Box padding={4} width="100vw" display="flex" justifyContent="center">
        <Stack direction="row" spacing={3}>
          <Stack direction="column" spacing={3}>
            <MontyHallPaper>
              <InfoView />
            </MontyHallPaper>
            <MontyHallPaper>
              <InputView loading={loading} error={error} {...actions} />
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
