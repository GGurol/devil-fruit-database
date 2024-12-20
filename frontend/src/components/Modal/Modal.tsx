import { FC, PropsWithChildren } from "react";
import { useModalContext } from "../../providers/Modal/Modal.context";
import { ModalContainer } from "./Modal.styled";

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const { closeModal } = useModalContext();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    closeModal();
  };

  return (
    <ModalContainer onClick={handleOverlayClick}>{children}</ModalContainer>
  );
};

export default Modal;
