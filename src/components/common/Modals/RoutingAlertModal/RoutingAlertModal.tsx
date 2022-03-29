import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../..';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@redux/hooks';
import { setRoutingModalOpen } from '@redux/modules/permit';

const RoutingAlertModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleGoToMain = () => {
    router.replace('/');
    dispatch(setRoutingModalOpen(false));
  };

  const handleModalClose = () => {
    dispatch(setRoutingModalOpen(false));
  };

  return (
    <Modal>
      <RoutingMainContainer>
        <TitleWrapper>
          <Desc>
            퇴장하실 경우 다시 방에 입장하실 수 없습니다. <br />
            <br /> 퇴장하시겠습니까?
          </Desc>
        </TitleWrapper>
        <ButtonWrapper>
          <Button color="gray" text="퇴장하기" onClick={handleGoToMain} />
          <Button text="취소" onClick={handleModalClose} />
        </ButtonWrapper>
      </RoutingMainContainer>
    </Modal>
  );
};

const RoutingMainContainer = styled.div`
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

export { RoutingAlertModal };
