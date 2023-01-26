import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilState } from "recoil";
import { resultsRecoilState } from "../recoil_state";
import { Decision } from "../types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { calculateWinPercentage } from "../utils";

export const ResultsTable = () => {
  const [results, setResults] = useRecoilState(resultsRecoilState);

  const columnHeaders: string[] = [
    "Trials",
    "Wins",
    "Losses",
    "Win probability",
    "Win percentage",
    "Decision",
  ];

  const clearResults = () => setResults(() => []);

  return (
    <Box p={4} width="35vw">
      <Box>
        <IconButton onClick={clearResults}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box maxHeight="80vh" minHeight="15vh" overflow="auto">
        <Table>
          <TableHead>
            <TableRow>
              {columnHeaders.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(({ userInput, probability }, index) => {
              const { trials, decision } = userInput;
              const { wins, losses, winProbability } = probability;

              const winPercentage =
                calculateWinPercentage &&
                calculateWinPercentage(4, winProbability);

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{trials}</TableCell>
                    <TableCell>{wins}</TableCell>
                    <TableCell>{losses}</TableCell>
                    <TableCell>{winProbability}</TableCell>
                    <TableCell>{winPercentage}%</TableCell>
                    <TableCell>{Decision[decision]}</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
