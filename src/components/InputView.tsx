import React from "react";
import { useLimits } from "../hooks/useLimits";
import { useProbability } from "../hooks/useProbability";
import { Decision, IRequest, RunAlternatives } from "../types";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

interface IInputView {
  setSimulationResponse: React.Dispatch<
    React.SetStateAction<ReturnType<typeof useProbability>>
  >;
}

export const InputView = ({ setSimulationResponse }: IInputView) => {
  const [request, setRequest] = React.useState<IRequest>();
  const [trials, setTrials] = React.useState(5);
  const [decision, setDecision] = React.useState(Decision.Keep);

  const { limits } = useLimits();
  const simulationResponse = useProbability(request);

  const runAlternatives: RunAlternatives[] = [
    {
      value: Decision.Keep,
      label: "Keep door",
    },
    {
      value: Decision.Change,
      label: "Change door",
    },
  ];

  const handleTrialsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const newValue = event.target.value.replace(/\D+/g, "");
    setTrials(+newValue);
  };

  const handleDecisionChange = (event: SelectChangeEvent<Decision>): void => {
    setDecision(event.target.value as Decision);
  };

  const handleSetRequestData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setRequest({ trials: trials, decision: decision });
  };

  const handleButtonDisabled = () => {
    if (limits !== undefined) {
      return trials < limits.min || trials > limits.max;
    }
  };

  React.useEffect(() => {
    if (simulationResponse !== undefined) {
      setSimulationResponse(simulationResponse);
    }
  }, [setSimulationResponse, simulationResponse]);

  return (
    <Paper variant="elevation" elevation={15}>
      <Stack direction="row" spacing={3} p={4}>
        <Button
          color="success"
          variant="outlined"
          onClick={handleSetRequestData}
          disabled={handleButtonDisabled()}
        >
          Start simulation
        </Button>
        <FormControl>
          <TextField
            value={trials}
            onChange={handleTrialsChange}
            // label="Amount of runs"
            variant="outlined"
            color="secondary"
          />
          <FormHelperText>
            Select the amount of simulations to run
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Select<Decision>
            value={decision}
            onChange={handleDecisionChange}
            color="secondary"
          >
            {runAlternatives.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Decide to keep the door or change the door
          </FormHelperText>
        </FormControl>
      </Stack>
    </Paper>
  );
};
