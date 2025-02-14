import styled from "styled-components";

export const Divider = styled.hr`
  display: flex;
  align-self: stretch;

  ${({ theme }) => theme.commonBorder}
`;
