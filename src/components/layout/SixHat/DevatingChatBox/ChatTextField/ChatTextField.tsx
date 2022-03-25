import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';

type ChatTextFieldProps = {
  onChange?: () => void;
  onClick: (arg: string) => void;
};

const ChatTextField = ({ onChange, onClick }: ChatTextFieldProps) => {
  const [contents, setContents] = useState<string>('');

  const handleOnClick = () => {
    onClick(contents);
  };

  return (
    <TextFieldContainer>
      <TextField onChange={e => setContents(e.target.value)} />
      <Button onClick={handleOnClick}>입력</Button>
    </TextFieldContainer>
  );
};

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 18px;
  height: 100%;
`;

const TextFieldContainer = styled.div`
  width: 100%;
  height: 98px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 90px;
  height: 42px;
  position: absolute;
  right: 30px;
  background-color: ${themedPalette.border_1};
  border-radius: 9px;
  border: none;
  color: ${themedPalette.main_text2};
  cursor: pointer;
`;

export { ChatTextField };
