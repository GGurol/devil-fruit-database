import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App.tsx";
import { ThemeProvider } from "./providers/Theme/ThemeProvider.tsx";
import { themeVars } from "./providers/Theme/Theme.ts";
import { DataProvider } from "./providers/Data/DataProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      palettes={themeVars.palettes}
      modes={themeVars.modes}
      commonColors={themeVars.commonColors}
      typography={themeVars.typography}
      breakpoints={themeVars.breakpoints}
      components={themeVars.components}
      commonStyles={themeVars.commonStyles}
    >
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <App />
        </DataProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
