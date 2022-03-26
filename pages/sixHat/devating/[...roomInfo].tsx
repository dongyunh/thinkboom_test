import React, { useState, useEffect, createContext } from 'react';
import { GetServerSideProps } from 'next';
import { InteractivePage, WaitingRoom, Share, ChatIcon } from '../../../src/components/common';
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
import { NicknameModal } from '../../../src/components/common';
import { ChattingRoom } from '../../../src/components/common';
import styled from 'styled-components';
import useSocketHook from '../../../src/hooks/useSocketHook';
import { makeStyles } from '@mui/styles';
import { HatType, UserList } from '@redux/modules/sixHat/types';
import { ToastContainer } from 'react-toastify';
import copyUrlHelper from '@utils/copyUrlHelper';

import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  icon: {
    color: '#FFFFFF',
  },
});

//TODO : any 수정하기
export const WaitingRoomContext = createContext<any>(null);

type SettingPageProps = {
  roomInfo: string[];
};

let ConnectedSocket: any;

const SettingPage = ({ roomInfo }: SettingPageProps) => {
  const dispatch = useAppDispatch();
  const { currentPage, nickname, chatHistory, senderId } = useAppSelector(sixHatSelector);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const HandleSocket = useSocketHook('sixhat');
  const classes = useStyles();
  const [roomTitle, roomId] = roomInfo;

  useEffect(() => {
    if (nickname) {
      ConnectedSocket = new HandleSocket(`${process.env.NEXT_PUBLIC_API_URL}/websocket`);
      ConnectedSocket.connectSH(senderId, roomId);
    }
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
    dispatch(updateCurrentPage(pageNum));
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
      {!nickname && <NicknameModal title={roomTitle} onClick={handleUpdateNickname} />}
      <ChatWrapper onClick={() => setIsChatOpen(!isChatOpen)}>
        <ChatIcon />
      </ChatWrapper>
      <ShareIconWrapper onClick={copyUrlHelper}>
        <Share />
      </ShareIconWrapper>
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
  right: 70px;
  bottom: 70px;
  cursor: pointer;
`;

const ShareIconWrapper = styled.div`
  position: fixed;
  right: 140px;
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
