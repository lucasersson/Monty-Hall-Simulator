import React from "react";
import { Alert, Snackbar, SnackbarProps } from "@mui/material";

interface IErrorSnackbar extends SnackbarProps {
  error?: string;
}

export const ErrorSnackbar = (props: IErrorSnackbar) => {
  const { error, ...rest } = props;

  return (
    <Snackbar
      open={error !== undefined}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      {...rest}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
