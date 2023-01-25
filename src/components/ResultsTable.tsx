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

interface IResultsTable {
  calculateWinPercentage: (probability: number, decimals: number) => number;
}

export const ResultsTable = (props: IResultsTable) => {
  const [results, setResults] = useRecoilState(resultsRecoilState);
  const { calculateWinPercentage } = props;

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
    <Box p={4}>
      <Box>
        <IconButton onClick={clearResults}>
          <ClearIcon />
        </IconButton>
      </Box>
      <Box maxHeight="70vh" minHeight="15vh" overflow="auto">
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

              const winPercentage = calculateWinPercentage(winProbability, 4);

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
