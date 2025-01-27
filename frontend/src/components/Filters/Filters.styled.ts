import { styled } from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  width: 256px;
  min-width: 256px;

  padding: 16px;

  border-radius: 4px;
  ${({ theme }) => theme.commonBorder}

  background-color: ${({ theme }) => theme.background["bg-primary"]};
`;
