import { styled } from "styled-components";

const Header = styled.h1`
  min-width: 132px;

  margin-right: auto;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.fgRegular};

  ${({ theme }) => theme.sectionTitle}

  /* prevent text highlight */
  user-select: none; // chrome, edge, opera, firefox
  -webkit-user-select: none; // safari
  -webkit-touch-callout: none; // ios
`;

export default Header;
