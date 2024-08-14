import { styled } from "styled-components";

export const Tooltip = styled.span`
  position: absolute;

  width: 120px;

  text-align: center;

  border-radius: 4px;

  padding: 8px;

  z-index: 1;

  top: 125%;
  left: 50%;

  margin-left: -60px;

  background-color: ${({ theme }) => theme.bgOverlay};
  color: ${({ theme }) => theme.fgRegular};

  backdrop-filter: blur(2px);

  transition: opacity 0.1s, visibility 0.1s, transform 0.1s;

  &::after {
    content: "";

    position: absolute;

    bottom: 100%;
    left: 50%;

    margin-left: -5px;

    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.bgOverlay}
      transparent;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;

  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
    transform: translateY(5px);
  }

  &:not(:hover) ${Tooltip} {
    transition-delay: 0.1s;
    visibility: hidden;
    opacity: 0;
  }
`;
