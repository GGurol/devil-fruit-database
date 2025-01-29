import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownList = styled.ul<{ width: number }>`
  position: absolute;
  position-anchor: --dropdown;

  width: ${({ width }) => width}px;
  height: fit-content;

  max-height: 200px;

  padding: 0;
  margin: 0;
  inset: auto;

  bottom: anchor(top);
  right: anchor(right);

  margin-bottom: 8px;

  list-style: none;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  border-radius: 4px;

  ${({ theme }) => theme.commonBorder}

  overflow-y: auto;

  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-tertiary"]};
    border: solid 3px ${({ theme }) => theme.background["bg-primary"]};

    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-secondary"]};
    border: solid 3px ${({ theme }) => theme.background["bg-primary"]};

    border-radius: 100px;
  }

  z-index: 10;
`;

export const DropdownItem = styled.li`
  padding: 8px 16px;

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.bodySmall};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background["bg-secondary"]};
  }
`;
