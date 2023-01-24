export interface MontyHallDto {
  userInput: IRequest;
  probability: IResponse;
}

export interface IResponse {
  wins: number;
  losses: number;
  winProbability: number;
}

export interface IRequest {
  trials: number;
  decision: Decision;
}

export interface ILimits {
  min: number;
  max: number;
}

export enum Decision {
  Keep = 1,
  Change,
}

export type RunAlternatives = {
  value: Decision;
  label: string;
};
