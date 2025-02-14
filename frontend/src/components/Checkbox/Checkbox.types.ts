import { InputHTMLAttributes } from "react";
import { CSSProp } from "styled-components";

export interface ICheckboxStyles {
  AccentPrimary: {
    unchecked: CSSProp;
    checked: CSSProp;
  };
}
export type TCheckboxVariants = keyof ICheckboxStyles;

interface ICheckboxBaseLabelConfig {
  hasLabel?: false;
  ascendingLabel?: boolean;
  labelText?: string;
}

interface ICheckboxLabelConfig {
  hasLabel?: true;
  ascendingLabel: boolean;
  labelText: string;
}

type TCheckboxLabel = ICheckboxBaseLabelConfig | ICheckboxLabelConfig;

export interface ICheckboxWrapperProps
  extends InputHTMLAttributes<HTMLInputElement> {
  $variant: TCheckboxVariants;
  $label?: TCheckboxLabel;
  $handleState: () => void;
}

export type TCheckboxProps = Omit<
  ICheckboxWrapperProps,
  "$label" | "$handleState"
>;
