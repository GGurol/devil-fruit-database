import { css } from "styled-components";
import { ICheckboxStyles } from "./Checkbox.types";

export const CheckboxStyles: ICheckboxStyles = {
  AccentPrimary: {
    unchecked: css`
      background: ${({ theme }) => theme.bgSurface};

      border: 1px solid ${({ theme }) => theme.borderRegular};
    `,
    checked: css`
      background: ${({ theme }) => theme.accentPrimary};

      border: none;
    `,
  },
  AccentSecondary: {
    unchecked: css`
      background: ${({ theme }) => theme.bgSurface};

      border: 1px solid ${({ theme }) => theme.borderRegular};
    `,
    checked: css`
      background: ${({ theme }) => theme.accentSecondary};

      border: none;
    `,
  },
};
