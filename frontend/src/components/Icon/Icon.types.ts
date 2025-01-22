import { ComponentType, SVGProps } from "react";

import * as Icons from "./src/index";

export type TIconComponents =
  | "CaretDown"
  | "CaretUp"
  | "Check"
  | "CheckCircle"
  | "Cross"
  | "Copy"
  | "Download"
  | "Moon"
  | "Search"
  | "Sun";

export const IconComponentMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = Object.entries(Icons).reduce((accumulator, [key, value]) => {
  return { ...accumulator, [key.replace("Icon", "")]: value };
}, {});

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "onClick"> {
  iconName: TIconComponents;
  fontSize?: string | number;
}
