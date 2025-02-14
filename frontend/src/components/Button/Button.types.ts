import { ButtonHTMLAttributes } from "react";
import { CSSProp } from "styled-components";
import { IIconProps } from "../Icon/Icon.types";

export type TButtonVariants =
  | "Outline"
  | "Solid"
  | "Text"
  | "IconOutline"
  | "IconSolid";

export interface IButtonStyles {
  Outline: CSSProp;
  Solid: CSSProp;
  Text: CSSProp;
  IconOutline: CSSProp;
  IconSolid: CSSProp;
}

interface IButtonBaseVariantConfig {
  variantName: TButtonVariants;
  staticColors?: {
    fgColor?: string;
  };
}

interface IButtonVariantConfig {
  variantName: "Solid";
  staticColors: {
    fgColor: string;
  };
}

type TButtonVariant = IButtonBaseVariantConfig | IButtonVariantConfig;

interface IButtonBaseIconConfig {
  hasIcon?: false;
}

interface IButtonIconConfig {
  hasIcon?: true;
  iconStyle: IIconProps;
}

export type IButtonIcon = IButtonBaseIconConfig | IButtonIconConfig;

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant: TButtonVariant;
  $minwidth?:
    | `${string}`
    | "auto"
    | {
        desktop?: `${string}` | "auto";
        tablet?: `${string}` | "auto";
        mobile?: `${string}` | "auto";
      };
  $fillContainer?: boolean;
  $icon?: IButtonIcon;
}
