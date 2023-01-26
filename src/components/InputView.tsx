import React from "react";
import { useLimits } from "../hooks/useLimits";
import { SubmitButton } from "./SubmitButton";
import { Decision, IRequest, SimAlternatives } from "../types";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { ErrorSnackbar } from "./ErrorSnackbar";

interface IInputView {
  request: IRequest | undefined;
  setRequest: React.Dispatch<React.SetStateAction<IRequest | undefined>>;
  trials: number;
  setTrials: React.Dispatch<React.SetStateAction<number>>;
  decision: Decision;
  setDecision: React.Dispatch<React.SetStateAction<Decision>>;
  loading?: boolean;
  error?: string;
}

export const InputView = (props: IInputView) => {
  const {
    setRequest,
    trials,
    setTrials,
    decision,
    setDecision,
    loading,
    error,
  } = props;

  const { limits } = useLimits();

  const runAlternatives: SimAlternatives[] = [
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

    return loading;
  };

  return (
    <Stack direction="row" spacing={3} p={4}>
      <ErrorSnackbar error={error} />
      <SubmitButton
        color="success"
        variant="outlined"
        onClick={handleSetRequestData}
        disabled={handleButtonDisabled()}
        loading={loading}
        sx={{ height: "100%" }}
      >
        Start simulation
      </SubmitButton>
      <FormControl>
        <TextField
          value={trials}
          onChange={handleTrialsChange}
          variant="outlined"
          color="secondary"
        />
        <FormHelperText>Select the amount of simulations to run</FormHelperText>
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
  );
};
