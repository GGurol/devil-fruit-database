import { InputHTMLAttributes } from "react";
import { CSSProp } from "styled-components";

export type TCheckboxVariants = "AccentPrimary" | "AccentSecondary";

export interface ICheckboxStyles {
  AccentPrimary: CSSProp;
  AccentSecondary: CSSProp;
}

interface ICheckboxBaseLabelConfig {
  hasLabel?: false;
  labelText?: string;
}

interface ICheckboxLabelConfig {
  hasLabel?: true;
  labelText: string;
}

type TCheckboxLabel = ICheckboxBaseLabelConfig | ICheckboxLabelConfig;

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  $variant: TCheckboxVariants;
  $label: TCheckboxLabel;
}
