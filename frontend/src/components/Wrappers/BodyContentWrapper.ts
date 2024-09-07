import styled from "styled-components";

const BodyContentWrapper = styled.div`
  display: flex;

  flex: 1;

  flex-direction: column;
  gap: 16px;

  width: 100%;

  padding: 32px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    padding: 16px;
  }
`;

export default BodyContentWrapper;
