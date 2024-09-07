import { styled } from "styled-components";

const BodyActionsWrapper = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export default BodyActionsWrapper;
