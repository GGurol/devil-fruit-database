import styled from "styled-components";

const BodyContentWrapper = styled.div`
  display: flex;

  flex: 1 0 0;
  align-items: flex-start;
  gap: 12px;

  width: 100%;
  height: 100%;

  padding: 32px;

  border: 1px solid ${({ theme }) => theme.borderRegular};
  border-radius: 4px;

  box-sizing: border-box;

  background-color: ${({ theme }) => theme.bgSurface};
`;

export default BodyContentWrapper;
