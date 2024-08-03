import { css } from "styled-components";
import { IButtonStyles } from "./Button.types";
import { palettes } from "../../App.constants";

export const ButtonStyles: IButtonStyles = {
  Outline: css`
    background-color: ${({ theme }) => theme.bgSurface};
    border: 1px solid ${({ theme }) => theme.borderRegular};

    &:hover {
      border-color: ${palettes.secondary["300"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${palettes.secondary["500"]};

      transition: border-color 100ms ease-in;
    }
  `,
  Solid: css`
    background-color: ${({ theme }) => theme.accentSecondary};
    color: ${palettes.grayscale["50"]};

    border: none;

    &:hover {
      background-color: ${palettes.secondary["400"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${palettes.secondary["300"]};

      transition: background-color 100ms ease-in;
    }
  `,
  IconOutline: css`
    background-color: ${({ theme }) => theme.bgSurface};
    border: 1px solid ${({ theme }) => theme.borderRegular};

    padding: 8px;

    &:hover {
      border-color: ${palettes.secondary["300"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${palettes.secondary["500"]};

      transition: border-color 100ms ease-in;
    }
  `,
  IconSolid: css`
    background-color: ${({ theme }) => theme.accentSecondary};
    color: ${palettes.grayscale["50"]};

    padding: 8px;

    border: none;

    &:hover {
      background-color: ${palettes.secondary["400"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${palettes.secondary["300"]};

      transition: background-color 100ms ease-in;
    }
  `,
};
