import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message, ChatTextField } from '../DevatingChatBox';
import { sixHatSelector } from '../../../../redux/modules/sixHat';
import { useAppSelector } from '../../../../redux/hooks';
import { HatImage } from '@components/common';

type DevatingChatBoxProps = {
  onClick: (arg: string) => void;
};

type StyleProps = {
  width?: number;
  height?: number;
  isMouseOver?: boolean;
};

const DevatingChatBox = ({ onClick }: DevatingChatBoxProps) => {
  const { subject, chatHistory, nickname, userList, myHat } = useAppSelector(sixHatSelector);

  const hatName = {
    red: '빨간모자',
    blue: '파란모자',
    white: '하얀모자',
    black: '검정모자',
    yellow: '노란모자',
    green: '초록모자',
  };

  return (
    <Container>
      <SubjectBox>{subject}</SubjectBox>
      <DownBox>
        <UserListBox>
          <MyHatBox>
            <HatImage type={myHat} width={70} height={70} />
          </MyHatBox>
          <UserList>
            {userList.map(user => {
              return (
                <UserProfile key={user.nickname}>
                  {user.hat !== null && <HatImage type={user.hat} width={20} height={20} />}
                  <User>{user.nickname}</User>
                </UserProfile>
              );
            })}
          </UserList>
        </UserListBox>
        <ChatViewBox>
          <MessageBox>
            {chatHistory?.map(data => {
              if (data.hat) {
                return (
                  <Message
                    key={data.nickname}
                    isMe={data.nickname === nickname}
                    message={data.message}
                    hatName={hatName[data.hat]}
                    hat={data.hat}
                  />
                );
              }
            })}
          </MessageBox>
          <ChatTextField onClick={onClick} />
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
  height: 508px;
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

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const User = styled.div`
  margin-bottom: 8px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 380px;
  overflow-y: scroll;
  margin-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export { DevatingChatBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
