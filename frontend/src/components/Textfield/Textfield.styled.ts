import { styled } from "styled-components";

export const TextfieldContainer = styled.div`
  position: relative;

  cursor: text;
`;

export const TextfieldIconContainer = styled.span`
  position: absolute;

  top: 55%;
  transform: translateY(-50%);

  left: 16px;
`;

const TextfieldInput = styled.input.attrs({ type: "text" })`
  background-color: ${({ theme }) => theme.bgSurface};

  width: 100%;

  padding: 8px 16px 8px 42px;

  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.borderRegular};
  border-radius: 4px;

  color: ${({ theme }) => theme.fgSubdued};

  ${({ theme }) => theme.bodySmall};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: none;

    color: ${({ theme }) => theme.fgRegular};

    border: 1px solid ${({ theme }) => theme.accentSecondary};
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.focusShadow};
  }
`;

export default TextfieldInput;
