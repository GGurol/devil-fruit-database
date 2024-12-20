import { styled } from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) =>
    theme.commonBackground["bg-modal-overlay"]};

  display: flex;
  justify-content: center;
  align-items: center;
`;
