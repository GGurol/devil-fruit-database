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
    box-shadow: inset 0 0 16px 16px ${({ theme }) => theme.bgOverlaySecondary};
    border: solid 3px ${({ theme }) => theme.bgSurface};

    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px ${({ theme }) => theme.bgSubdued};
    border: solid 3px ${({ theme }) => theme.bgSurface};

    border-radius: 100px;
  }

  &::-webkit-scrollbar-corner {
    background: none;
  }

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const TableWrapper = styled.table`
  width: 100%;

  border-collapse: collapse;

  @media (max-width: 768px) {
    min-width: 600px;
  }
`;

export const TableThread = styled.thead`
  position: sticky;

  top: 0;

  z-index: 1;

  background-color: ${({ theme }) => theme.bgSurface};
`;

export const TableBody = styled.tbody<ITableProps>`
  ${({ $alternate, theme }) =>
    $alternate &&
    css`
      tr:nth-child(odd) {
        background-color: ${theme.bgSubdued};
      }
    `}

  tr:last-of-type {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.borderRegular};
`;

export const TableHeader = styled.th`
  color: ${({ theme }) => theme.fgRegular};

  padding: 8px 16px;
  text-align: left;

  ${({ theme }) => theme.label}

  border-right: 1px solid ${({ theme }) => theme.borderRegular};
  border-bottom: 1px solid ${({ theme }) => theme.borderRegular};

  &:last-of-type {
    border-right: none;
  }
`;

export const TableData = styled.td`
  color: ${({ theme }) => theme.fgRegular};

  padding: 8px 16px;
  text-align: left;
  vertical-align: top;

  ${({ theme }) => theme.bodySmall}

  border-right: 1px solid ${({ theme }) => theme.borderRegular};
  border-bottom: 1px solid ${({ theme }) => theme.borderRegular};

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
    --color: ${theme.fgRegular};
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

export default TableWrapper;
