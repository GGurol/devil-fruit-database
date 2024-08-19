import styled from "styled-components";
import { ILegendItemCircleProps } from "./LegendItem.types";

export const LegendItemContainer = styled.div`
  display: flex;

  align-items: center;
  gap: 8px;
`;

export const LegendItemCircle = styled.div<ILegendItemCircleProps>`
  width: 12px;
  height: 12px;

  flex-shrink: 0;

  border-radius: 50px;

  background-color: ${({ $color }) => $color};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.bgSubdued};
`;

export const LegendItemLabel = styled.p`
  ${({ theme }) => theme.bodySmall}

  color: ${({ theme }) => theme.fgRegular};
`;
