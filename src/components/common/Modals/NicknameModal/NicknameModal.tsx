import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TextField, Button } from '../../../common';
import styled from 'styled-components';
import v8n from 'v8n';

type NicknameModalProps = {
  title: string;
  onClick: (arg: any) => void;
};

const NicknameModal = ({ title, onClick }: NicknameModalProps) => {
  const [nickname, setNickname] = useState<string>();
  const [isError, setIsError] = useState<boolean>();

  const validation = v8n().string().length(2, 6);

  const checkValidation = (_nickname: string) => {
    setNickname(_nickname);
    setIsError(!validation.test(_nickname));
  };

  const handleOnClick = () => {
    if (!onClick) return;
    onClick(nickname);
  };

  return (
    <Modal>
      <MakeRoomContainer>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextField
            label="닉네임"
            errorText="닉네임은 2~6자 이내로 설정해주세요"
            hintText="닉네임을 입력해주세요 (2~6자)"
            isError={isError}
            onChange={checkValidation}
          />
        </TextFieldWrapper>
        <Button text="개설하기" onClick={handleOnClick} />
      </MakeRoomContainer>
    </Modal>
  );
};

const MakeRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 38px;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-bottom: 22px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 70px;
`;

const TextFieldWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
`;

export { NicknameModal };
