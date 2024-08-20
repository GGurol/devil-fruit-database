import { css } from "styled-components";
import { IButtonStyles } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Outline: css`
    background-color: ${({ theme }) => theme.bgSurface};
    ${({ theme }) => theme.commonBorder};

    &:hover {
      border-color: ${({ theme }) => theme.secondary["300"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) => theme.secondary["500"]};

      transition: border-color 100ms ease-in;
    }
  `,
  Solid: css`
    background-color: ${({ theme }) => theme.accentSecondary};
    color: ${({ theme }) => theme.grayscale["50"]};

    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.secondary["400"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) => theme.secondary["300"]};

      transition: background-color 100ms ease-in;
    }
  `,
  IconOutline: css`
    background-color: ${({ theme }) => theme.bgSurface};
    ${({ theme }) => theme.commonBorder};

    padding: 8px;

    &:hover {
      border-color: ${({ theme }) => theme.secondary["300"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) => theme.secondary["500"]};

      transition: border-color 100ms ease-in;
    }
  `,
  IconSolid: css`
    background-color: ${({ theme }) => theme.accentSecondary};
    color: ${({ theme }) => theme.grayscale["50"]};

    padding: 8px;

    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.secondary["400"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) => theme.secondary["300"]};

      transition: background-color 100ms ease-in;
    }
  `,
};
