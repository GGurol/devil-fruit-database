import { css, styled } from "styled-components";
import { ITextfieldProps } from "./Textfield.types";

export const TextfieldContainer = styled.div`
  position: relative;

  width: 100%;

  cursor: text;
`;

export const TextfieldIconContainer = styled.span`
  position: absolute;

  top: 55%;
  transform: translateY(-50%);

  left: 16px;
`;

const TextfieldInput = styled.input.attrs({ type: "text" })<ITextfieldProps>`
  background-color: ${({ theme }) => theme.background["bg-primary"]};

  width: 100%;

  ${({ $icon }) =>
    $icon?.hasIcon
      ? css`
          padding: 8px 16px 8px 42px;
        `
      : css`
          padding: 8px 16px;
        `}

  box-sizing: border-box;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  color: ${({ theme }) => theme.foreground["fg-tertiary"]};

  ${({ theme }) => theme.bodySmall};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: none;

    color: ${({ theme }) => theme.foreground["fg-primary"]};

    border: 1px solid
      ${({ theme }) => theme.commonInteractive["interactive-primary"]};
    box-shadow: 0px 0px 0px 2px
      ${({ theme }) => theme.interactive["interactive-focus"]};
  }
`;

export default TextfieldInput;
