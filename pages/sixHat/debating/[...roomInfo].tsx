import React, { useState, useEffect, createContext } from 'react';
import { GetServerSideProps } from 'next';
import {
  InteractivePage,
  WaitingRoom,
  ShareIcon,
  ChatIcon,
  TutorialIcon,
} from '../../../src/components/common';
import { SelectHat, DevatingRoom } from '../../../src/components/layout/SixHat';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import {
  updateCurrentPage,
  changeIsSubmitState,
  sixHatSelector,
  getNickname,
  getMyHat,
  clearChatHistory,
} from '../../../src/redux/modules/sixHat';
import { NicknameModal, LimitModal } from '../../../src/components/common';
import { ChattingRoom } from '../../../src/components/common';
import styled from 'styled-components';
import useSocketHook from '../../../src/hooks/useSocketHook';
import { HatType, UserList } from '@redux/modules/sixHat/types';
import { ToastContainer } from 'react-toastify';
import copyUrlHelper from '@utils/copyUrlHelper';

import 'react-toastify/dist/ReactToastify.css';

//TODO : any 수정하기
export const WaitingRoomContext = createContext<any>(null);

type SettingPageProps = {
  roomInfo: string[];
};

let ConnectedSocket: any;

const SettingPage = ({ roomInfo }: SettingPageProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, nickname, chatHistory, senderId, userCount } =
    useAppSelector(sixHatSelector);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFull, setIsFull] = useState(userCount.currentUser / userCount.totalUser);
  const [roomTitle, roomId] = roomInfo;

  const HandleSocket = useSocketHook('sixhat');

  useEffect(() => {
    setIsFull(userCount.currentUser / userCount.totalUser);
  }, [userCount]);

  useEffect(() => {
    if (nickname) {
      ConnectedSocket = new HandleSocket(`${process.env.NEXT_PUBLIC_API_URL}/websocket`);
      ConnectedSocket.connectSH(senderId, roomId);
    }
    return () => {
      if (ConnectedSocket) {
        ConnectedSocket.disConnect();
      }
    };
  }, [nickname]);

  const sendHatData = (hat: HatType) => {
    ConnectedSocket.sendHatData(nickname, hat);
    dispatch(getMyHat(hat));
  };

  const sendMessage = (message: string) => {
    ConnectedSocket.sendMessage(nickname, message);
  };

  const handelSendDevatingMessage = (message: string) => {
    ConnectedSocket.sendMessageDB(nickname, message);
  };

  const handleNextPage = (pageNum: number) => {
    ConnectedSocket.sendCurrentPage(pageNum);
  };

  const handleSubmitSubject = (_subject?: string) => {
    ConnectedSocket.submitSubject(_subject);
    dispatch(changeIsSubmitState(true));
  };

  const handleUpdateNickname = async (enteredName: string) => {
    dispatch(getNickname({ shRoomId: roomId, nickname: enteredName }));
  };

  const handleSendRandomHat = (userHatList: UserList) => {
    ConnectedSocket.sendRandomHatData(userHatList);
  };

  const handleCompleteSelect = () => {
    handleNextPage(2);
    dispatch(clearChatHistory());
  };

  const pages = [
    {
      component: (
        <WaitingRoom
          onClickSubmit={handleSubmitSubject}
          onClickComplete={() => handleNextPage(1)}
        />
      ),
    },
    {
      component: (
        <SelectHat
          onClick={sendHatData}
          onClickComplete={handleCompleteSelect}
          onClickRandom={handleSendRandomHat}
        />
      ),
    },
    {
      component: <DevatingRoom onClick={handelSendDevatingMessage} />,
    },
  ];

  const contextValue = {
    sendMessage,
  };

  return (
    <WaitingRoomContext.Provider value={contextValue}>
      <ToastContainer position="bottom-left" autoClose={3000} theme="dark" />
      <InteractivePage pages={pages} currentPage={currentPage} />
      {!nickname && isFull <= 1 && (
        <NicknameModal title={roomTitle} onClick={handleUpdateNickname} />
      )}
      {isFull > 1 && <LimitModal />}
      <ShareIconWrapper onClick={copyUrlHelper}>
        <ShareIcon />
      </ShareIconWrapper>
      <ChatWrapper onClick={() => setIsChatOpen(!isChatOpen)}>
        <ChatIcon />
      </ChatWrapper>
      <TutorialIconWrapper>
        <TutorialIcon type="sixHat" />
      </TutorialIconWrapper>

      {isChatOpen && (
        <ChattingContainer>
          <ChattingRoom
            myNickname={nickname}
            chatHistory={chatHistory}
            onClick={() => setIsChatOpen(!isChatOpen)}
          />
        </ChattingContainer>
      )}
    </WaitingRoomContext.Provider>
  );
};

export default SettingPage;

const ChatWrapper = styled.div`
  position: fixed;
  right: 140px;
  bottom: 70px;
  cursor: pointer;
`;

const ShareIconWrapper = styled.div`
  position: fixed;
  right: 210px;
  bottom: 70px;
  cursor: pointer;
`;

const TutorialIconWrapper = styled.div`
  position: fixed;
  right: 70px;
  bottom: 70px;
  cursor: pointer;
`;

const ChattingContainer = styled.div`
  position: fixed;
  right: 70px;
  bottom: 130px;
`;

export const getServerSideProps: GetServerSideProps = async context => {
  console.log(context);
  const { query } = context;
  const { roomInfo } = query;
  return {
    props: {
      roomInfo,
    },
  };
};
