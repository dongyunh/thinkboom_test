import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme';
import { WaitingRoomContext } from '../../../../../pages/sixHat/devating/[...roomInfo]';

const ChatTextField = ({}) => {
  const [content, setContent] = useState<string>();
  const { sendMessage } = useContext(WaitingRoomContext);

  const handleSendMessage = () => {
    sendMessage(content);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      setContent('');
    }
  };

  return (
    <TextFieldContainer>
      <TextField
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => onKeyPress(e)}
      />
      <Button onClick={handleSendMessage}>입력</Button>
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
  height: 60px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 50px 0 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  right: 15px;
  border: none;
  background-color: transparent;
  color: #8a8a8a;
  cursor: pointer;
`;

export { ChatTextField };
