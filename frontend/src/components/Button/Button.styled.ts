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

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.bodySmall};

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

        @media (min-width: ${({ theme }) =>
            theme.breakpoints.tablet.min}) and (max-width: ${({ theme }) =>
            theme.breakpoints.tablet.max}) {
          min-width: ${$minwidth.tablet};
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
          min-width: ${$minwidth.mobile};
        }
      `;
    }
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    ${({ $fillContainer }) => $fillContainer && "flex: 1 0 auto;"}
  }
`;

export default ButtonWrapper;
