import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "./providers/Theme/ThemeProvider.tsx";
import { themeVars } from "./providers/Theme/Theme.ts";
import { DataProvider } from "./providers/Data/DataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      palettes={themeVars.palettes}
      modes={themeVars.modes}
      common={themeVars.common}
      typography={themeVars.typography}
      components={themeVars.components}
    >
      <DataProvider>
        <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
