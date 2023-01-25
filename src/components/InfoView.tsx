import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export const InfoView = () => {
  const titleText = "Monty Hall Simulator";
  const aboutText =
    "Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, Do you want to pick door No. 2? Is it to your advantage to switch your choice?";
  const aboutText2 =
    "This simulator proves what decision you make heavily determines the outcome.";

  return (
    <Box p={4}>
      <Stack direction="column" spacing={3}>
        <Typography fontSize={42}>{titleText}</Typography>
        <Typography sx={{ opacity: 0.8 }}>{aboutText}</Typography>
        <Typography sx={{ opacity: 0.8 }}>{aboutText2}</Typography>
      </Stack>
    </Box>
  );
};
