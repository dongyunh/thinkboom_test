import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../..';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme';
import { useRouter } from 'next/router';

const LimitModal = () => {
  const router = useRouter();

  const moveToMain = () => {
    router.push('/');
  };

  return (
    <Modal>
      <LimitModalContainer>
        <Title>인원이 초과되었습니다</Title>
        <Button text="확인" onClick={moveToMain} />
      </LimitModalContainer>
    </Modal>
  );
};

const LimitModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 38px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${themedPalette.bg_page3};
  border-radius: 18px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-bottom: 22px;
  color: ${themedPalette.main_text1};
`;

export { LimitModal };

/**
 * TODO : 1.모든 요소 입력 안되었을 때, 버튼 diabled 처리하기
 */
