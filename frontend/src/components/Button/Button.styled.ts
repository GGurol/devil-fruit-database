import styled, { css } from "styled-components";
import { IButtonProps } from "./Button.types";

const ButtonWrapper = styled.button<IButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  white-space: nowrap;

  padding: 8px 16px;

  border-radius: 4px;

  color: ${({ theme }) => theme.fgRegular};

  ${({ theme }) => theme.bodySmall};

  cursor: pointer;

  ${({ theme, $variant }) => theme.buttons[$variant.variantName]}

  ${({ $minwidth }) => {
    return (
      $minwidth &&
      css`
        min-width: ${$minwidth};
      `
    );
  }}
`;

export default ButtonWrapper;
