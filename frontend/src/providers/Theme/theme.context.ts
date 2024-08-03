import { createContext, useContext } from "react";
import { IThemeState } from "./theme.types";

export const ThemeContext = createContext<IThemeState | undefined>(undefined);
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
