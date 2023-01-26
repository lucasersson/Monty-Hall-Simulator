import React from "react";
import { useSetRecoilState } from "recoil";
import { resultsRecoilState } from "../recoil_state";
import { IRequest, MontyHallDto } from "../types";

/**
 *
 * @param input
 * @yields {MontyHallDto} Request data.
 */
export const useProbability = (request?: IRequest) => {
  const [response, setResponse] = React.useState<MontyHallDto>();
  const [loading, setLoading] = React.useState<boolean>();
  const [error, setError] = React.useState<string>();

  const setResults = useSetRecoilState(resultsRecoilState);

  const baseUrl = process.env.REACT_APP_API_URL;

  const getProbability = React.useCallback(async () => {
    if (request === undefined) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/probability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data: MontyHallDto = await response.json();

      setResponse(data);
      setResults((array) => [...array, data]);
    } catch {
      setError("Unexpected error occured.");
      setTimeout(() => {
        setError(undefined);
      }, 6000);
    }

    setLoading(false);
    return Promise.resolve();
  }, [setResults, request, baseUrl]);

  React.useEffect(() => {
    getProbability();
  }, [getProbability]);

  return { response, loading, error };
};
