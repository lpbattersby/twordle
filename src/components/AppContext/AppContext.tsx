import React from "react";

export interface IAppContext {
  currentGuessGrid : string[][]
}

export const AppContext = React.createContext<IAppContext | undefined>(undefined);
