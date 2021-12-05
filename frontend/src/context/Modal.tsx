import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

interface ModalProviderProps{
  children:any
}

interface ModalProps extends ModalProviderProps{
  onClose:any;
}

const ModalContext = React.createContext(null);

export function ModalProvider({ children }:ModalProviderProps) {
  const modalRef = useRef(null);
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: ModalProps) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}