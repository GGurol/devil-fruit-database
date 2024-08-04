import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import GlobalStyles from "./Theme.globals";
import { ITheme, TModes } from "./Theme.types";
import { ThemeContext } from "./Theme.context";

export const ThemeProvider: FC<PropsWithChildren<ITheme>> = ({
  children,
  ...props
}) => {
  const { palettes, modes, common, typography, components } = props;

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
    palettes,
    mode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledComponentsThemeProvider
        theme={{
          ...palettes,
          ...common,
          ...typography,
          ...(mode === "light" ? modes.light : modes.dark),
          ...components,
        }}
      >
        <GlobalStyles />

        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};
