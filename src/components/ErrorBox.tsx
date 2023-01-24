import React from "react";
import { Alert, AlertTitle } from "@mui/material";

interface IErrorBox {
  error?: string;
}

export const ErrorBox = (props: IErrorBox) => {
  const { error } = props;

  if (error === undefined) {
    return null;
  }

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );
};
