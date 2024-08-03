import { ComponentType, SVGProps } from "react";

import * as Icons from "./src/index";

export type TIconComponents = "Download" | "Moon" | "Sun";

export const IconComponentMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = Object.entries(Icons).reduce((accumulator, [key, value]) => {
  return { ...accumulator, [key.replace("Icon", "")]: value };
}, {});

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "onClick"> {
  iconName: TIconComponents;
  fontSize?: number;
  color?: string;
}
