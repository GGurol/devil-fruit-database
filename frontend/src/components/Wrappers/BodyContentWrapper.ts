import styled from "styled-components";

const BodyContentWrapper = styled.div`
  display: flex;

  flex-direction: column;

  flex: 1;

  gap: 16px;

  width: 100%;

  padding: 32px;

  border: 1px solid ${({ theme }) => theme.borderRegular};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.bgSurface};
`;

export default BodyContentWrapper;
