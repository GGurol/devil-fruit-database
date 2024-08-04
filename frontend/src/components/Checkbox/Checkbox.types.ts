import { InputHTMLAttributes } from "react";
import { CSSProp } from "styled-components";

export interface ICheckboxStyles {
  AccentPrimary: {
    unchecked: CSSProp;
    checked: CSSProp;
  };
  AccentSecondary: {
    unchecked: CSSProp;
    checked: CSSProp;
  };
}
export type TCheckboxVariants = keyof ICheckboxStyles;

interface ICheckboxBaseLabelConfig {
  hasLabel?: false;
  labelText?: string;
}

interface ICheckboxLabelConfig {
  hasLabel?: true;
  labelText: string;
}

type TCheckboxLabel = ICheckboxBaseLabelConfig | ICheckboxLabelConfig;

export interface ICheckboxWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  $variant: TCheckboxVariants;
  $label?: TCheckboxLabel;
}

export type TCheckboxProps = Omit<ICheckboxWrapperProps, "$label"> {}
