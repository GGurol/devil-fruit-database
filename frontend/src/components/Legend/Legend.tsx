import { FC } from "react";
import { LegendWrapper } from "./Legend.styles";
import LegendItem from "./src/LegendItem";
import { useTheme } from "styled-components";

const Legend: FC = () => {
  const theme = useTheme();

  return (
    <LegendWrapper>
      <LegendItem $color={theme.legend.awakened} $label="Awakened User" />
      <LegendItem $color={theme.legend.artificial} $label="Artificial User" />
    </LegendWrapper>
  );
};

export default Legend;
