import { styled } from "styled-components";

const Header = styled.h1`
  display: flex;

  color: ${({ theme }) => theme.fgRegular};

  min-width: 132px;

  flex: 1 0 0;
  align-items: center;
  align-self: stretch;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.sectionTitle}
`;

export default Header;
