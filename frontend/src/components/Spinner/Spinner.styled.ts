import { keyframes, styled } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

export const SpinnerDiv = styled.div`
  position: relative;

  width: 2rem;
  height: 2rem;

  border-radius: 100%;

  background: conic-gradient(
    rgba(0, 0, 0, 0) 30%,
    ${({ theme }) => theme.interactive["interactive-focus"]} 100%
  );

  animation: ${spin} 1s linear infinite;

  &::before {
    content: "";
    position: absolute;

    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;

    background: ${({ theme }) => theme.background["bg-primary"]};
    border-radius: 50%;
  }
`;
