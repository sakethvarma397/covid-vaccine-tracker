import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const ModalRoot = document.getElementById("modal");
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    ModalRoot.appendChild(elRef.current);
    return () => ModalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
