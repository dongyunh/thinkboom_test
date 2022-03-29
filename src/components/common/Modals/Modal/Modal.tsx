import React, { ReactChild, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';

type ModalProps = {
  children: ReactChild;
};

function Modal({ children }: ModalProps) {
  const [container] = useState(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'NicknameModal');
    return modalRoot;
  });

  useLayoutEffect(() => {
    const root = document.getElementById('modal_root');
    if (!root) {
      return;
    }
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <S_ModalOverlay />
      <S_ModalWrapper>{children}</S_ModalWrapper>
    </>,
    container,
  );
}

const S_ModalOverlay = styled.div`
  background: ${themedPalette.overlay};
  opacity: 50%;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 998;
`;

const S_ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${themedPalette.bg_page1};
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 508px;
  z-index: 999;
`;

export { Modal };
