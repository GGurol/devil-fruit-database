import { css } from "styled-components";
import { ICheckboxStyles } from "./Checkbox.types";

export const CheckboxStyles: ICheckboxStyles = {
  AccentPrimary: {
    unchecked: css`
      background: ${({ theme }) => theme.bgSurface};

      ${({ theme }) => theme.commonBorder};
    `,
    checked: css`
      background: ${({ theme }) => theme.accentPrimary};

      border: none;
    `,
  },
  AccentSecondary: {
    unchecked: css`
      background: ${({ theme }) => theme.bgSurface};

      ${({ theme }) => theme.commonBorder};
    `,
    checked: css`
      background: ${({ theme }) => theme.accentSecondary};

      border: none;
    `,
  },
};
