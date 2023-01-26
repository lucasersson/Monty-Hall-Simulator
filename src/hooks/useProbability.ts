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

  const setResults = useSetRecoilState(resultsRecoilState)

  const baseUrl = "https://localhost:7154/api";

  const getProbability = React.useCallback( async() => {
    if(request === undefined) {
      return;
    }

    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/probability`, {
        method: "POST",
        headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
      })

      const data: MontyHallDto = await response.json()

      setResponse(data)
      setResults((array) => [
        ...array, data
      ])
    } catch {
      setError("Unexpected error occured.")
      setTimeout(() => {
        setError(undefined)
      }, 6000);
    }

    setLoading(false)
  }, [setResults, request])
  
  React.useEffect(() => {
    getProbability();
  }, [getProbability])

  return {response, loading, error}
};
