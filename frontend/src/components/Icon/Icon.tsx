import { FC } from "react";
import { IconComponentMap, IIconProps } from "./Icon.types";

export const Icon: FC<IIconProps> = (props) => {
  const { iconName, fontSize = 20, color, ...rest } = props;

  const IconComponent = IconComponentMap[iconName];

  const _props: {
    fontSize?: number;
    color?: string;
  } = { fontSize, ...rest };

  if (!color) _props.color = color;

  return <IconComponent {..._props} />;
};
