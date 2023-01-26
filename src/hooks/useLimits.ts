import React from "react";
import { ILimits } from "../types";

/**
 * Gets the input limits for requesting simulation.
 * @returns {ILimits} min and max valid input values.
 */
export const useLimits = () => {
  const [limits, setLimits] = React.useState<ILimits>();
  const [loading, setLoading] = React.useState(false);

  const baseUrl = process.env.REACT_APP_API_URL;

  const getLimits = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/api/limits`, {
      method: "GET",
    });

    const data: ILimits | undefined = await response.json();

    if (data !== undefined) {
      setLimits(data);
    }
    setLoading(false);
  }, [baseUrl]);

  React.useEffect(() => {
    if (!loading && limits === undefined) {
      getLimits();
    }
  }, [getLimits, limits, loading]);

  return { limits };
};
