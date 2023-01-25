import React from "react";
import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";

interface ISubmitButton extends ButtonProps {
  loading?: boolean;
  children?: React.ReactNode;
}

export const SubmitButton = (props: ISubmitButton) => {
  const { loading, children, ...rest } = props;

  return (
    <Box sx={{ position: "relative" }}>
      <Button {...rest}>{children}</Button>
      {loading && (
        <CircularProgress
          size={48}
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -3,
            marginLeft: -3,
          }}
        />
      )}
    </Box>
  );
};
