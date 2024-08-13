import styled, { css } from "styled-components";
import { IDataTextProps } from "./Table.types";

export const TableContainer = styled.div`
  display: inline-block;

  flex: 1 0 0;

  width: 100%;

  max-height: 100%;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.borderRegular};

  overflow-y: auto;

  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
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
`;

const TableWrapper = styled.table`
  width: 100%;

  border-collapse: collapse;
`;

export const TableThread = styled.thead`
  position: sticky;

  top: 0;

  background-color: ${({ theme }) => theme.bgSurface};
`;

export const TableBody = styled.tbody`
  tr:nth-child(odd) {
    /* background-color: ${({ theme }) => theme.bgSubdued}; */
  }

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
  ${DataItem} & {
    ${({
      theme,
      $showSpoilers,
      $useSpoilerBlock,
      $awakening,
      $isArtifical,
    }) => css`
      --color: ${theme.fgRegular};
      --font-weight: 400;

      color: var(--color);
      font-weight: var(--font-weight);

      ${$isArtifical &&
      css`
        --color: ${theme.primary[700]};
        --font-weight: 500;

        text-decoration: underline;
        text-decoration-style: dotted;

        ${!$showSpoilers &&
        !$useSpoilerBlock &&
        css`
          --color: theme.fgRegular;
          --font-weight: 400;

          text-decoration: none;
        `}
      `}

      ${$awakening?.$isAwakend &&
      css`
        --color: ${theme.tertiary[400]};
        --font-weight: 500;

        text-decoration: underline;
        text-decoration-style: dotted;

        ${!$showSpoilers &&
        !$useSpoilerBlock &&
        $awakening.$isSpoiler &&
        css`
          --color: theme.fgRegular;
          --font-weight: 400;

          text-decoration: none;
        `}
      `}

      ${$useSpoilerBlock &&
      css`
        background-color: ${$showSpoilers
          ? "transparent"
          : theme.borderRegular};
        color: ${$showSpoilers ? "var(--color)" : "transparent"};

        &:hover {
          background-color: ${$showSpoilers ? "none" : "transparent"};
          color: var(--color);
          transition: background-color 0.1s ease-out;
        }
      `};
    `}
  }
`;

export default TableWrapper;
