import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Message, ChatTextField } from '../DevatingChatBox';
import { sixHatSelector } from '../../../../redux/modules/sixHat';
import { useAppSelector } from '../../../../redux/hooks';

type StyleProps = {
  width?: number;
  height?: number;
  isMouseOver?: boolean;
};

const ResultBox = ({}) => {
  const { subject, chatHistory, nickname } = useAppSelector(sixHatSelector);

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
        <ChatViewBox>
          <MessageBox>
            {chatHistory?.map((data, idx) => {
              if (data.hat) {
                return (
                  <Message
                    key={idx}
                    isMe={data.nickname === nickname}
                    message={data.message}
                    hatName={hatName[data.hat]}
                    hat={data.hat}
                  />
                );
              }
            })}
          </MessageBox>
        </ChatViewBox>
      </DownBox>
    </Container>
  );
};

const Container = styled.div`
  width: 800px;
  height: 520px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  margin-bottom: 30px;
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

const ChatViewBox = styled.div`
  width: 832px;
  height: 512px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 32px 48px 30px 48px;
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

export { ResultBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
