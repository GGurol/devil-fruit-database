import { css, DefaultTheme } from "styled-components";

export const artificalTextStyles = css`
  --color: ${({ theme }) => theme.legend.artificial};
  --font-weight: 500;

  text-decoration: underline dotted;

  cursor: help;
`;

export const awakeningTextStyles = css`
  --color: ${({ theme }) => theme.legend.awakened};
  --font-weight: 500;

  text-decoration: underline dotted;

  cursor: help;
`;

export const defaultTextStyles = css`
  --color: ${({ theme }) => theme.foreground["fg-primary"]};
  --font-weight: 400;

  text-decoration: none;

  cursor: text;
`;

export const spoilerBlockStyles = (
  $showSpoilers: boolean,
  theme: DefaultTheme
) => css`
  background-color: ${$showSpoilers
    ? "transparent"
    : theme.border["border-primary"]};
  color: ${$showSpoilers ? "var(--color)" : "transparent"};

  &:hover {
    background-color: ${$showSpoilers ? "none" : "transparent"};
    color: var(--color);
    transition: background-color 0.1s ease-out;
  }
`;
