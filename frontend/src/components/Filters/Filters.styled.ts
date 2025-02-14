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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: none;
  }
`;

export const FiltersOverlay = styled.div`
  display: none;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) =>
    theme.commonBackground["bg-modal-overlay"]};

  z-index: 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: block;
  }
`;

export const FiltersMobileContainer = styled.div`
  display: none;
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;

  padding: 16px;

  border-radius: 4px 4px 0 0;
  ${({ theme }) => theme.commonBorder}

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    display: block;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    flex-direction: column;
  }
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
