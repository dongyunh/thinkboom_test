import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../../../common';
import styled from 'styled-components';

type ResultModalProps = {
  onClickBtn1: () => void;
  onClickBtn2: () => void;
};

const ResultModal = ({ onClickBtn1, onClickBtn2 }: ResultModalProps) => {
  return (
    <Modal>
      <MakeRoomContainer>
        <TitleWrapper>
          <Desc>
            저희 서비스에서의 작업물은 기본적으로 갤러리에 공유됩니다. 원치 않으시는 경우에는 공유를
            취소하실 수 있습니다. <br />
            <br /> 작업물을 공유하시겠습니까?
          </Desc>
        </TitleWrapper>
        <ButtonWrapper>
          <Button color="gray" text="공유하지 않기" onClick={onClickBtn1} />
          <Button text="공유하기" onClick={onClickBtn2} />
        </ButtonWrapper>
      </MakeRoomContainer>
    </Modal>
  );
};

const MakeRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px;
  box-sizing: border-box;
  width: 100%;
`;

const Desc = styled.p`
  font-size: 22px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export { ResultModal };
