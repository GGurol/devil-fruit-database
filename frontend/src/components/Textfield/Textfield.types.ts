import { InputHTMLAttributes } from "react";
import { IIconProps } from "../Icon/Icon.types";

interface ITextfieldBaseIconConfig {
  hasIcon?: false;
}

interface ITextfieldIconConfig {
  hasIcon?: true;
  iconStyle: IIconProps;
}

export type ITextfieldIcon = ITextfieldBaseIconConfig | ITextfieldIconConfig;

export interface ITextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  $icon?: ITextfieldIcon;
}
