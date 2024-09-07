import { css } from "styled-components";
import { IButtonStyles } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Outline: css`
    background-color: ${({ theme }) => theme.background["bg-primary"]};
    ${({ theme }) => theme.commonBorder};

    &:hover {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) => theme.commonInteractive["interactive-primary"]};

      transition: border-color 100ms ease-in;
    }
  `,
  Solid: css`
    background-color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary"]};
    color: ${({ theme }) => theme.foreground["fg-primary-on-brand"]};

    border: none;

    &:hover {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-active"]};

      transition: background-color 100ms ease-in;
    }
  `,
  IconOutline: css`
    background-color: ${({ theme }) => theme.background["bg-primary"]};
    ${({ theme }) => theme.commonBorder};

    padding: 8px;

    &:hover {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) =>
        theme.theme.commonInteractive["interactive-primary"]};};

      transition: border-color 100ms ease-in;
    }
  `,
  IconSolid: css`
    background-color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary"]};
    color: ${({ theme }) => theme.foreground["fg-primary-on-brand"]};

    padding: 8px;

    border: none;

    &:hover {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-active"]};

      transition: background-color 100ms ease-in;
    }
  `,
};
