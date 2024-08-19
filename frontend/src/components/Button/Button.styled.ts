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

  ${({ theme }) => theme.buttonSmall};

  cursor: pointer;

  ${({ theme, $variant }) => theme.buttons[$variant.variantName]}

  ${({ $minwidth }) => {
    if (typeof $minwidth === "string") {
      return css`
        min-width: ${$minwidth};
      `;
    } else if ($minwidth) {
      return css`
        min-width: ${$minwidth.desktop};

        @media (max-width: 768px) {
          min-width: ${$minwidth.mobile};
        }
      `;
    }
  }}

  @media (max-width: 768px) {
    flex: 1 0 auto;
  }
`;

export default ButtonWrapper;
