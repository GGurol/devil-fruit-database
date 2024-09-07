import { css } from "styled-components";
import { ICheckboxStyles } from "./Checkbox.types";

export const CheckboxStyles: ICheckboxStyles = {
  AccentPrimary: {
    unchecked: css`
      background: ${({ theme }) => theme.background["bg-primary"]};

      ${({ theme }) => theme.commonBorder};
    `,
    checked: css`
      background: ${({ theme }) => theme.commonInteractive["interactive-primary"]};

      border: none;
    `,
  },
};
