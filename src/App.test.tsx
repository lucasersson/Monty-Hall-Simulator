import React from "react";
import { render, screen } from "@testing-library/react";
import { InfoView } from "./components/InfoView";
import { IInputView, InputView } from "./components/InputView";
import { ResultsView } from "./components/ResultsView";
import { useProbability } from "./hooks/useProbability";
import { IResultsBar, ResultsBar } from "./components/ResultsBar";
import { App } from "./App";

test("Info view", () => {
  render(<InfoView />);
  const title = screen.getByText("Monty Hall Simulator");
  expect(title).toBeInTheDocument();
});

const renderInputView = () => {
  const defaultProps: IInputView = {
    request: undefined,
    trials: 5,
    decision: 1,
    setRequest: () => undefined,
    setTrials: () => undefined,
    setDecision: () => undefined,
  };
  return render(<InputView {...defaultProps} />);
};

test("Input view", () => {
  renderInputView();

  const submitButton = screen.getByRole("submitButton");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveAttribute("type", "button");
  expect(submitButton).not.toBeDisabled();

  const decisionSelect = screen.getByRole("decisionSelect");
  expect(decisionSelect).toHaveTextContent("Keep door");

  const inputDescription = screen.getByText(
    "Select the amount of simulations to run"
  );
  const selectDescription = screen.getByText(
    "Decide to keep the door or change the door"
  );

  expect(inputDescription).toBeInTheDocument();
  expect(selectDescription).toBeInTheDocument();
});

const renderResultsBarView = () => {
  const defaultProps: IResultsBar = {
    winPercentage: 50,
  };

  return render(<ResultsBar {...defaultProps} />);
};

test("resultsbar view", () => {
  renderResultsBarView();

  const resultsBar = screen.getByRole("resultsBar");
  expect(resultsBar).toHaveTextContent("50%");
});

const renderResultsTextView = () => {
  const defaultProps: ReturnType<typeof useProbability> = {
    response: {
      probability: {
        wins: 5,
        losses: 5,
        winProbability: 0.5,
      },
      userInput: {
        trials: 10,
        decision: 1,
      },
    },
    loading: undefined,
    error: undefined,
  };

  return render(<ResultsView {...defaultProps} />);
};

test("resultsText view", () => {
  renderResultsTextView();

  const infoBoxes = screen.getAllByRole("infoBox");

  // Trials box
  expect(infoBoxes[0]).toHaveTextContent("Trials");
  expect(infoBoxes[0]).toHaveTextContent("10");

  // Wins box
  expect(infoBoxes[1]).toHaveTextContent("Wins");
  expect(infoBoxes[1]).toHaveTextContent("5");

  // Losses box
  expect(infoBoxes[2]).toHaveTextContent("Losses");
  expect(infoBoxes[2]).toHaveTextContent("5");

  // Win probability box
  expect(infoBoxes[3]).toHaveTextContent("Win p(a)");
  expect(infoBoxes[3]).toHaveTextContent("0.5");

  // Win percentage box
  expect(infoBoxes[4]).toHaveTextContent("Win %");
  expect(infoBoxes[4]).toHaveTextContent("50");

  // Decision box
  expect(infoBoxes[5]).toHaveTextContent("Decision");
  expect(infoBoxes[5]).toHaveTextContent("Keep");
});

test("resultsTable view", () => {
  render(<App />);

  const columnHeaders = [
    "Trials",
    "Wins",
    "Losses",
    "Win probability",
    "Win percentage",
    "Decision",
  ];

  const clearTableButton = screen.getByRole("clearTableButton");
  expect(clearTableButton).not.toBeDisabled();

  const columns = screen.getAllByRole("tableHeaderColumn");
  columns.map((column, index) =>
    expect(column).toHaveTextContent(columnHeaders[index])
  );
});
