import styled, { css } from "styled-components";
import { ISpoilerProps } from "./Table.types";

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
    background-color: ${({ theme }) => theme.bgSubdued};
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

  ${({ theme }) => theme.bodySmall}

  border-right: 1px solid ${({ theme }) => theme.borderRegular};
  border-bottom: 1px solid ${({ theme }) => theme.borderRegular};

  &:last-of-type {
    border-right: none;
  }
`;

export const UserList = styled.ul`
  list-style-type: none;

  margin: 0;
  padding: 0;
`;

export const UserItem = styled.li``;

export const SpoilerContainer = styled.div<ISpoilerProps>`
  ${(props) =>
    props.$showSpoilers === false &&
    css`
      cursor: pointer;

      .spoiler-content {
        background-color: ${({ theme }) => theme.borderRegular};

        color: transparent;
      }

      &:hover .spoiler-content {
        background-color: transparent;

        color: ${({ theme }) => theme.fgRegular};

        transition: background-color 0.1s ease-out;
      }
    `}
`;

export const SpoilerContent = styled.span``;

export default TableWrapper;
