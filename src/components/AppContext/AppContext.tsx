import React from "react";

export interface IAppContext {
  currentGrid : string[][];
  setCurrentGrid : (newGuessGrid: string[][]) => void;
}

export const AppContext = React.createContext<IAppContext | undefined>(undefined);
