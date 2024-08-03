import { styled } from "styled-components";

const Header = styled.h1`
  display: flex;

  color: ${({ theme }) => theme.fgRegular};

  flex: 1 0 0;
  align-items: center;
  align-self: stretch;

  ${({ theme }) => theme.sectionTitle}
`;

export default Header;
