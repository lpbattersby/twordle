import React from "react";

export interface IAppContext {
  currentGuess : string[][];
  setCurrentGuess : (newGuessGrid: string[][]) => void;
}

export const AppContext = React.createContext<IAppContext | undefined>(undefined);
