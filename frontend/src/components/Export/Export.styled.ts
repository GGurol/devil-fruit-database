import { styled } from "styled-components";

export const ExportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  width: 80%;
  height: 60%;

  padding: 24px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
    max-width: 932px;
    max-height: 776px;

    min-height: 256px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    width: 100%;
    height: 100%;
  }
`;

export const ExportHeaderWrapper = styled.div`
  align-self: stretch;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExportCodeBlock = styled.div`
  flex: 1 0 0;
  align-self: stretch;

  padding: 16px;

  overflow-y: auto;
  overflow-x: auto;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-tertiary"]};

  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 16px 16px ${({ theme }) => theme.alpha["400"]};
    border: solid 3px ${({ theme }) => theme.background["bg-tertiary"]};

    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px ${({ theme }) => theme.alpha["200"]};
    border: solid 3px ${({ theme }) => theme.background["bg-tertiary"]};

    border-radius: 100px;
  }

  &::-webkit-scrollbar-corner {
    background: none;
  }
`;

export const CodeBlock = styled.pre`
  ${({ theme }) => theme.code}
  color: ${({ theme }) => theme.foreground["fg-secondary"]};
`;

export const ExportActionsWrapper = styled.div`
  align-self: stretch;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;
