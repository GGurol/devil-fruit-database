import { styled } from "styled-components";

const FooterWrapper = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export default FooterWrapper;
