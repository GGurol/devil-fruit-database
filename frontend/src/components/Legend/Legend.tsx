import { FC } from "react";
import { LegendWrapper } from "./Legend.styles";
import LegendItem from "./src/LegendItem";
import { useTheme } from "styled-components";

const Legend: FC = () => {
  const theme = useTheme();

  return (
    <LegendWrapper>
      <LegendItem $color={theme.tertiary[400]} $label="Awakened User" />
      <LegendItem $color={theme.purple[600]} $label="Artifical User" />
    </LegendWrapper>
  );
};

export default Legend;
