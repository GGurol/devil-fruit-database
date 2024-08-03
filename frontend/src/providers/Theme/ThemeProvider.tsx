import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { themeVars } from "./theme";
import { TModes } from "./theme.types";
import GlobalStyles from "./theme.globals";
import { ThemeContext } from "./theme.context";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  // initialize state with a default value or retrieve from localStorage
  const [mode, setMode] = useState<TModes>(() => {
    const savedMode = localStorage.getItem("mode");

    if (savedMode === "light" || savedMode === "dark") {
      return savedMode;
    } else {
      return "light";
    }
  });

  // update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const value = {
    mode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledComponentsThemeProvider
        theme={{
          ...themeVars.common,
          ...themeVars.typography,
          ...(mode === "light" ? themeVars.modes.light : themeVars.modes.dark),
          ...themeVars.components,
        }}
      >
        <GlobalStyles />

        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};
