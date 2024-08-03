import { FC } from "react";

import { useThemeContext } from "./providers/Theme/theme.context";

import Button from "./components/Button/Button";
import PageWrapper from "./components/Wrappers/PageWrapper";
import HeaderWrapper from "./components/Wrappers/HeaderWrapper";
import Logo from "./components/Logo/Logo";
import Header from "./components/Header/Header";
import ActionsWrapper from "./components/Wrappers/ActionsWrapper";

import logo from "./assets/one-piece.png";
import { palettes } from "./App.constants";

export const App: FC = () => {
  const { mode, toggleMode } = useThemeContext();

  return (
    <PageWrapper>
      <HeaderWrapper>
        <Logo src={logo} />
        <Header>Devil Fruit Database</Header>
        <ActionsWrapper>
          <Button
            onClick={toggleMode}
            $variant={{ variantName: "Outline" }}
            $minwidth="132px"
            $icon={{
              hasIcon: true,
              iconStyle: {
                iconName: mode === "light" ? "Moon" : "Sun",
              },
            }}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
          <Button
            $variant={{
              variantName: "Solid",
              staticColors: { fgColor: palettes.grayscale["50"] },
            }}
            $icon={{
              hasIcon: true,
              iconStyle: {
                iconName: "Download",
              },
            }}
          >
            Download
          </Button>
        </ActionsWrapper>
      </HeaderWrapper>
    </PageWrapper>
  );
};

export default App;
