import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
    justify-content: space-between;
    align-self: stretch;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const PaginationText = styled.span`
  ${({ theme }) => theme.bodySmall}

  color: ${({ theme }) => theme.foreground["fg-quaternary"]};
`;
