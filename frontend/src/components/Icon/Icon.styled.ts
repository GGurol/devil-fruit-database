import styled from "styled-components";

const IconWrapper = styled.svg`
  fill: ${({ theme }) => theme.foreground["fg-primary"]};

  width: ${({ fontSize }) => fontSize};
  height: ${({ fontSize }) => fontSize};
`;

export default IconWrapper;
