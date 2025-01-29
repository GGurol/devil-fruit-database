import { styled } from "styled-components";

export const FiltersContainer = styled.div`
  position: relative;
`;

export const FiltersPopoverContainer = styled.div`
  position: absolute;
  position-anchor: --filters;

  padding: 0;
  margin: 0;
  inset: auto;

  top: anchor(bottom);
  right: anchor(right);

  width: fit-content;
  min-width: 256px;

  height: fit-content;

  padding: 16px;

  margin-top: 8px;

  border-radius: 4px;
  ${({ theme }) => theme.commonBorder}

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  z-index: 10;

  @media (max-width: 768px) {
    /* display: none;  */
  }
`;

export const FilterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const FilterSectionsContainer = styled.div<{ $isLandscape: boolean }>`
  display: flex;
  flex-direction: ${({ $isLandscape }) => ($isLandscape ? "row" : "column")};
  align-items: flex-start;
  gap: 24px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 200px;
`;

export const FilterSectionItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

export const FilterSectionHeader = styled.p`
  ${({ theme }) => theme.label}

  color: ${({ theme }) => theme.foreground["fg-primary"]};
`;

export const FilterBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 12px;
`;

export const FilterActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: space;
  align-self: stretch;
  gap: 8px;
`;