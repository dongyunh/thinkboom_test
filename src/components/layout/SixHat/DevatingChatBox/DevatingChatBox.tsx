import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message, ChatTextField } from '../DevatingChatBox';
const HatSrc = require('../../../../../public/hat.png');

type MessageDataType = {
  nickname: string;
  hat: string;
  message: string;
};

type DevatingChatBoxProps = {
  subject: string;
  myNickname: string;
  myHat: string;
  userList: string[];
  messageData: MessageDataType[];
};

type StyleProps = {
  width?: number;
  height?: number;
  isMouseOver?: boolean;
};

const DevatingChatBox = ({
  subject,
  myNickname,
  myHat,
  userList,
  messageData,
}: DevatingChatBoxProps) => {
  return (
    <Container>
      <SubjectBox>{subject}</SubjectBox>
      <DownBox>
        <UserListBox>
          <MyHatBox>
            <HatImg src={HatSrc} width={70} />
          </MyHatBox>
          <UserList>
            {messageData.map(data => {
              return <User key={data.nickname}>{data.nickname}</User>;
            })}
          </UserList>
        </UserListBox>
        <ChatViewBox>
          <MessageBox>
            {messageData.reverse().map(data => {
              return (
                <Message
                  key={data.nickname}
                  isMe={data.nickname === myNickname}
                  message={data.message}
                  hatName="빨간모자"
                  hat={data.hat}
                />
              );
            })}
          </MessageBox>
          <ChatTextField />
        </ChatViewBox>
      </DownBox>
    </Container>
  );
};

const Container = styled.div`
  width: 1044px;
  height: 586px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
`;

const MyHatBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 18px;
  border: 5px solid ${themedPalette.border_1};
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${themedPalette.black};
  color: ${themedPalette.main_text2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: relative;
`;

const DownBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const UserListBox = styled.div`
  width: 212px;
  height: 514px;
  border-right: 5px solid ${themedPalette.black};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const ChatViewBox = styled.div`
  width: 832px;
  height: 512px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 32px 48px 30px 48px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
`;

const User = styled.div`
  margin-bottom: 8px;
`;

const HatImg = styled.img<StyleProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: 15px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 380px;
  overflow-y: scroll;
  margin-bottom: 10px;
`;

export { DevatingChatBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
