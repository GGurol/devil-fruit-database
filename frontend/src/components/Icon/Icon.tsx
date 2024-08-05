import { FC } from "react";
import { IconComponentMap, IIconProps } from "./Icon.types";

export const Icon: FC<IIconProps> = (props) => {
  const { iconName, fontSize = 20, ...rest } = props;

  const IconComponent = IconComponentMap[iconName];

  const _props: {
    fontSize?: number | string;
  } = { fontSize, ...rest };

  return <IconComponent {..._props} />;
};
