import { styled } from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  stroke-width: 1px;
  stroke: ${({ theme }) => theme.borderRegular};

  fill: ${({ theme }) => theme.bgSurface};
`;

export default CheckboxWrapper;
