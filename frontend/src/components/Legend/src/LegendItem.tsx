import { FC } from "react";
import {
  LegendItemCircle,
  LegendItemLabel,
  LegendItemContainer,
} from "./LegendItem.styled";
import { ILegendItemProps } from "./LegendItem.types";

const LegendItem: FC<ILegendItemProps> = (props) => {
  const { $color, $label } = props;

  return (
    <LegendItemContainer>
      <LegendItemCircle $color={$color} />
      <LegendItemLabel>{$label}</LegendItemLabel>
    </LegendItemContainer>
  );
};

export default LegendItem;
