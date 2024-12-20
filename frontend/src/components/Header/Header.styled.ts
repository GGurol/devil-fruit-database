import { styled } from "styled-components";

export const Header = styled.h1`
  min-width: 132px;

  margin-right: auto;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.headerSmall}

  /* prevent text highlight */
  user-select: none; // chrome, edge, opera, firefox
  -webkit-user-select: none; // safari
  -webkit-touch-callout: none; // ios
`;

export const HeaderExtraSmall = styled.h1`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.headerExtraSmall}
`;
