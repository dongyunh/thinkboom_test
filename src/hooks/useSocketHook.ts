import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getMessages,
  getUserHatInfo,
  getUserList,
  sixHatSelector,
  getRandomHatList,
  getSubjectSH,
  updateCurrentPage,
} from '../redux/modules/sixHat';
import { getUserCount } from '../redux/modules/CountUser';

import mixHatsHelper from '@utils/mixHatsHelper';
import { toast } from 'react-toastify';

import { UserList, UserData, HatType } from '@redux/modules/sixHat/types';

export type SixHatResponseData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING' | 'NEXTPAGE';
  roomId: string | null;
  sender: string;
  senderId: number | null;
  hat: HatType;
  message: string | null;
  randomHat: UserList;
  subject: string;
  totalUser: number;
  currentUser: number;
  currentPage: number;
};

export type SixHatSendData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING' | 'NEXTPAGE';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  hat: HatType | null;
  message: string | null;
  randomHat?: UserList;
  subject?: string;
  currentPage?: number;
};

export default function useSocketHook(type: 'sixhat' | 'brainwriting') {
  const dispatch = useAppDispatch();

  const _api = type == 'sixhat' ? '/subSH/api/sixHat/rooms/' : '/sub/api/brainWriting/rooms/';
  const _messageApi =
    type == 'sixhat' ? '/pubSH/api/sixHat/chat/message' : '/pub/api/brainWriting/chat/message';

  class HandleSocket {
    SockJs;
    StompClient: Stomp.Client;
    _roomId: string | null;
    _senderId: number | null;

    constructor(url: string) {
      this.SockJs = new SockJS(url);
      this.StompClient = Stomp.over(this.SockJs);
      this._roomId = null;
      this._senderId = null;
    }

    connectSH(senderId: number | null, roomId: string) {
      this._senderId = senderId;
      this._roomId = roomId;

      this.StompClient.connect({ senderId: this._senderId }, () => {
        this.StompClient.subscribe(
          `/subSH/api/sixHat/rooms/${roomId}`,
          data => {
            const response: SixHatResponseData = JSON.parse(data.body) as SixHatResponseData;

            if (response.type === 'ENTER') {
              const userData: UserData = {
                nickname: response.sender,
                hat: 'none',
              };
              const userCount = {
                totalUser: response.totalUser,
                currentUser: response.currentUser,
              };
              dispatch(getUserList(userData));
              dispatch(getUserCount(userCount));
            }

            if (response.type === 'QUIT') {
              const userCount = {
                totalUser: response.totalUser,
                currentUser: response.currentUser,
              };
              dispatch(getUserCount(userCount));
            }

            if (response.type === 'TALK') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
              };
              dispatch(getMessages(newMessage));
              toast.info('메시지가 도착했습니다');
            }

            if (response.type === 'DEBATING') {
              const newMessage = {
                nickname: response.sender,
                message: response.message,
                hat: response.hat,
              };
              dispatch(getMessages(newMessage));
            }

            if (response.type === 'SUBJECT') {
              dispatch(getSubjectSH(response.subject));
              toast.info('주제가 공유되었습니다');
            }

            if (response.type === 'HAT') {
              const userInfo: UserData = {
                nickname: response.sender,
                hat: response.hat,
              };
              dispatch(getUserHatInfo(userInfo));
            }

            if (response.type === 'RANDOMHAT') {
              dispatch(getRandomHatList(response.randomHat));
            }

            if (response.type === 'NEXTPAGE') {
              dispatch(updateCurrentPage(response.currentPage));
            }
          },
          { senderId: this._senderId, category: 'SH' },
        );
      });
    }

    disConnect() {
      this.StompClient.disconnect(() => {}, {
        senderId: this._senderId,
        category: 'SH',
      });
    }

    // 웹소켓이 연결될 때 까지 실행하는 함수
    waitForConnection = (ws: any, callback: any) => {
      setTimeout(() => {
        if (ws.ws.readyState === 1) {
          callback();
        } else {
          this.waitForConnection(ws, callback);
        }
      }, 0.1);
    };

    send = (data: SixHatSendData) => {
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        this.StompClient.send(
          '/pubSH/api/sixHat/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    };

    sendMessage = (sender: string, message: string) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'TALK',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: null,
          message: message,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendMessageDB = (sender: string, message: string, myHat: HatType) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'DEBATING',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: myHat,
          message: message,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendHatData = (sender: string | null, hat: HatType) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'HAT',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          hat: hat,
          message: null,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendRandomHatData = (userHatList: UserList) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'RANDOMHAT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          randomHat: mixHatsHelper(userHatList),
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    submitSubject = (subject: string) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'SUBJECT',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          subject: subject,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };

    sendCurrentPage = (pageNum: number) => {
      try {
        // send할 데이터
        const data: SixHatSendData = {
          type: 'NEXTPAGE',
          roomId: this._roomId,
          sender: null,
          senderId: this._senderId,
          hat: null,
          message: null,
          currentPage: pageNum,
        };
        this.send(data);
      } catch (e) {
        console.log('message 소켓 함수 에러', e);
      }
    };
  }

  return HandleSocket;
}
