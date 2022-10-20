import { memo, useContext } from 'react';
import ModalContext from '~/context/modal.js';

function useModal() {
  const { stateModal, setStateModal } = useContext(ModalContext);
  function openModal() { setStateModal((state) => ({ ...state, status: true })); }
  function closeModal() { setStateModal((state) => ({ ...state, status: false })); }
  return [stateModal, setStateModal, openModal, closeModal];
}

export { useModal };
