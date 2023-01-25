import React from "react";
import { useProbability } from "../hooks/useProbability";
import { Stack, Paper, Typography } from "@mui/material";
import { calculateWinPercentage } from "../utils";
import { Decision } from "../types";

export const ResultsText = (props: ReturnType<typeof useProbability>) => {
  const { response } = props;

  const input = response?.userInput;
  const probability = response?.probability;

  const infoBoxes: IInfoBox[] = [
    {
      text: "Trials",
      value: input?.trials,
    },
    {
      text: "Wins",
      value: probability?.wins,
      color: "darkgreen",
    },
    {
      text: "Losses",
      value: probability?.losses,
      color: "darkred",
    },
    {
      text: "Win p(a)",
      value: probability?.winProbability,
    },
    {
      text: "Win %",
      value: calculateWinPercentage(probability?.winProbability || 0, 4),
    },
    {
      text: "Decision",
      value: input?.decision && Decision[input.decision],
    },
  ];

  return (
    <Stack direction="row" spacing={3} mt={2}>
      {infoBoxes.map((infoBox) => (
        <InfoBox key={infoBox.text} {...infoBox} />
      ))}
    </Stack>
  );
};

interface IInfoBox {
  text: string;
  value?: number | string;
  color?: string;
}

const InfoBox = ({ text, value, color = "inherit" }: IInfoBox) => {
  return (
    <Paper variant="elevation" elevation={24} sx={{ minWidth: 175 }}>
      <Stack direction="column" padding={4}>
        <Typography sx={{ opacity: 0.8 }}>{text}</Typography>
        <Typography fontSize={32} color={color}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
};
