import { createContext, useContext } from "react";
import { IModalState } from "./Modal.types";

export const ModalContext = createContext<IModalState | undefined>(undefined);
export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
