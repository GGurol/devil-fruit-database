import styled, { css } from "styled-components";

import { IDataTextProps, ITableProps } from "./Table.types";
import {
  artificalTextStyles,
  awakeningTextStyles,
  defaultTextStyles,
  spoilerBlockStyles,
} from "./Table.styles";

export const TableContainer = styled.div`
  flex: 1 0 0;

  width: 100%;

  min-height: 128px;
  max-height: 100%;

  border-radius: 2px;
  ${({ theme }) => theme.commonBorder};

  overflow-y: auto;

  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
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

  &::-webkit-scrollbar-corner {
    background: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    overflow-x: auto;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  height: 100%;
`;

export const EmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  padding-top: 24px;
  padding-bottom: 24px;
`;

export const EmptyTextContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyHeaderText = styled.p`
  ${({ theme }) => theme.label}
  color: ${({ theme }) => theme.foreground["fg-primary"]};
`;

export const EmptyBodyTextContainer = styled.div`
  ${({ theme }) => theme.bodySmall}
  color: ${({ theme }) => theme.commonForeground["fg-disabled"]};

  text-align: center;

  max-width: 300px;
`;

export const EmptyBodyText = styled.span``;

export const EmptySearchQuery = styled.div`
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  background-color: red;
`;

export const TableWrapper = styled.table`
  width: 100%;

  border-collapse: collapse;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    min-width: 600px;
  }
`;

export const TableThread = styled.thead`
  position: sticky;

  top: 0;

  z-index: 1;

  background-color: ${({ theme }) => theme.background["bg-primary"]};
`;

export const TableBody = styled.tbody<ITableProps>`
  ${({ $alternate, theme }) =>
    $alternate &&
    css`
      tr:nth-child(odd) {
        background-color: ${theme.background["bg-secondary"]};
      }
    `}

  tr:last-of-type {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};
`;

export const TableHeader = styled.th`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  padding: 8px 16px;
  text-align: left;

  ${({ theme }) => theme.label}

  border-right: 1px solid ${({ theme }) => theme.border["border-primary"]};
  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};

  &:last-of-type {
    border-right: none;
  }
`;

export const TableData = styled.td`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  padding: 8px 16px;
  text-align: left;
  vertical-align: top;

  ${({ theme }) => theme.bodySmall}

  border-right: 1px solid ${({ theme }) => theme.border["border-primary"]};
  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};

  &:last-of-type {
    border-right: none;
  }
`;

export const DataList = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;
`;

export const DataItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const DataText = styled.p<IDataTextProps>`
  ${({
    theme,
    $showSpoilers,
    $useSpoilerBlock,
    $awakening,
    $isArtificial,
  }) => css`
    --color: ${theme.foreground["fg-primary"]};
    --font-weight: 400;

    color: var(--color);
    font-weight: var(--font-weight);

    cursor: default;

    ${$isArtificial &&
    css`
      ${artificalTextStyles}
      ${!$showSpoilers && !$useSpoilerBlock && defaultTextStyles}
    `}

    ${$awakening?.$isAwakend &&
    css`
      ${awakeningTextStyles}
      ${!$showSpoilers &&
      !$useSpoilerBlock &&
      $awakening.$isSpoiler &&
      defaultTextStyles}
    `}

    ${$useSpoilerBlock && spoilerBlockStyles($showSpoilers, theme)};
  `}
`;
