import React, { useState } from 'react';

const ModalContext = React.createContext({});

export default ModalContext;

export function ModalProvider({ children }) {
  const [stateModal, setStateModal] = useState({ status: false, title: 'This is title', message: 'This is message', onAccept: () => {}, onCancel: () => {}, textBtnAccept: 'Accept' || null, textBtnCancel: 'Cancel' || null });

  return (
    <ModalContext.Provider value={{ stateModal, setStateModal }}>
      { children }
    </ModalContext.Provider>
  );
}
