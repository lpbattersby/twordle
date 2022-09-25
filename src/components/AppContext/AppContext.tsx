import React from "react";

export interface IAppContext {
  currentGuessGrid : string[][];
  setCurrentGuessGrid : (newGuessGrid: string[][]) => void;
}

export const AppContext = React.createContext<IAppContext | undefined>(undefined);
