import { createContext, useContext } from "react";
import { IDataState } from "./Data.types";

export const DataContext = createContext<IDataState | undefined>(undefined);
export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }

  return context;
};
