import { styled } from "styled-components";
import { TCheckboxProps, ICheckboxWrapperProps } from "./Checkbox.types";

const CheckboxWrapper = styled.div<ICheckboxWrapperProps>`
  display: flex;

  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

export const CheckboxInput = styled.input.attrs({
  type: "checkbox",
})<TCheckboxProps>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;

  justify-content: center;
  align-items: center;

  border-radius: 4px;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  margin: 0;

  cursor: pointer;

  ${({ theme, $variant }) => theme.checkboxes[$variant].unchecked}

  &:checked {
    ${({ theme, $variant }) => theme.checkboxes[$variant].checked}
  }
`;

export const CheckboxInputWrapper = styled.div`
  position: relative;

  display: inline-flex;
  align-items: center;
`;

export const CheckIconOverlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
`;

export const CheckboxLabel = styled.label`
  color: ${({ theme }) => theme.fgRegular};

  ${({ theme }) => theme.bodySmall};

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  cursor: pointer;

  /* prevent text highlight */
  user-select: none; // chrome, edge, opera, firefox
  -webkit-user-select: none; // safari
  -webkit-touch-callout: none; // ios
`;

export default CheckboxWrapper;
