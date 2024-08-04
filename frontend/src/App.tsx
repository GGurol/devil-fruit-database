import { FC } from "react";

import { useThemeContext } from "./providers/Theme/Theme.context";

import Button from "./components/Button/Button";
import PageWrapper from "./components/Wrappers/PageWrapper";
import HeaderWrapper from "./components/Wrappers/HeaderWrapper";
import Logo from "./components/Logo/Logo";
import Header from "./components/Header/Header";
import ActionsWrapper from "./components/Wrappers/ActionsWrapper";

import logo from "./assets/one-piece.png";
import BodyWrapper from "./components/Wrappers/BodyWrapper";
import ContentWrapper from "./components/Wrappers/ContentWrapper";
import BodyActionsWrapper from "./components/Wrappers/BodyActionsWrapper";
import ToggleWrapper from "./components/Wrappers/ToggleWrapper";
import Checkbox from "./components/Checkbox/Checkbox";
import BodyContentWrapper from "./components/Wrappers/BodyContentWrapper";

export const App: FC = () => {
  const { palettes, mode, toggleMode } = useThemeContext();

  return (
    <PageWrapper>
      <ContentWrapper>
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
        <BodyWrapper>
          <BodyActionsWrapper>
            <ToggleWrapper>
              <Checkbox
                $variant="AccentSecondary"
                $label={{ hasLabel: true, labelText: "Show Spoilers" }}
              />
              <Checkbox
                $variant="AccentSecondary"
                $label={{ hasLabel: true, labelText: "Show Non-Canon" }}
              />
            </ToggleWrapper>
            <div>search</div>
          </BodyActionsWrapper>
          <BodyContentWrapper>
            <div>body</div>
          </BodyContentWrapper>
        </BodyWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default App;
