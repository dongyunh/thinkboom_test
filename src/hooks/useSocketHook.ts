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
  getUserCount,
} from '../redux/modules/sixHat';
import mixHatsHelper from '../utils/mixHatsHelper';
import { toast } from 'react-toastify';

import { UserList, UserData, HatType } from '@redux/modules/sixHat/types';
import { User } from '@redux/modules/brainWriting/types'; 

export type SixHatResponseData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING';
  roomId: string | null;
  sender: string;
  senderId: number | null;
  hat: HatType;
  message: string | null;
  randomHat: UserList;
  subject: string;
  totalUser: number;
  currentUser: number;
};

export type SixHatSendData = {
  type: 'ENTER' | 'TALK' | 'HAT' | 'QUIT' | 'SUBJECT' | 'RANDOMHAT' | 'DEBATING';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  hat: HatType | null;
  message: string | null;
  randomHat?: UserList;
  subject?: string;
};

export type BrainWritingResponseData = {
  type: 'ENTER' | 'TALK' | 'QUIT';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  message: string | null;
  // createdAt: string | null;
};

export type BrainWritingSendData = {
  type: 'ENTER' | 'TALK' | 'QUIT';
  roomId: string | null;
  sender: string | null;
  senderId: number | null;
  message: string | null;
};


export default function useSocketHook(type: 'sixhat' | 'brainwriting') {
  const dispatch = useAppDispatch();
  const { myHat } = useAppSelector(sixHatSelector);

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

    connectBW(senderId: number | null, roomId: string){
      this._senderId = senderId;
      this._roomId = roomId;
      console.log(senderId, roomId);
  
      this.StompClient.connect( {senderId: this._senderId} , () => {
        this.StompClient.subscribe(
          `/sub/api/brainwriting/rooms/${roomId}`,
          data => {
            const response = JSON.parse(data.body);
            console.log(response);
            
            // if (response.type === 'ENTER') {
            //   const User = {
            //     nickname: response.sender,
            //   };
            //   // dispatch(getUserList(User));
            //   console.log(User)
            // }
            // if (response.type === 'TALK') {
            //   const newMessage = {
            //     nickname: response.sender,
            //     message: response.message,
            //   };
            //   dispatch(getMessages(newMessage));
            //   toast.info('???????????? ??????????????????');
            // }
          },
          { senderId: this._senderId, category: 'BW' },
        );
      });
  
    }

    connectSH(senderId: number | null, roomId: string) {
      this._senderId = senderId;
      this._roomId = roomId;

      this.StompClient.connect({ senderId: this._senderId }, () => {
        this.StompClient.subscribe(
          `/subSH/api/sixHat/rooms/${roomId}`,
          data => {
            const response: SixHatResponseData = JSON.parse(data.body) as SixHatResponseData;
            console.log(response);

            if (response.type === 'ENTER') {
              const userData = {
                nickname: response.sender,
                hat: null,
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
              toast.info('???????????? ??????????????????');
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
              console.log('???????????? ??????', response.subject);
              dispatch(getSubjectSH(response.subject));
              toast.info('????????? ?????????????????????');
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

    // ???????????? ????????? ??? ?????? ???????????? ??????
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
        // send??? ?????????
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
        console.log('message ?????? ?????? ??????', e);
      }
    };

    sendMessageDB = (sender: string, message: string) => {
      try {
        // send??? ?????????
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
        console.log('message ?????? ?????? ??????', e);
      }
    };

    sendHatData = (sender: string | null, hat: HatType) => {
      try {
        // send??? ?????????
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
        console.log('message ?????? ?????? ??????', e);
      }
    };

    sendRandomHatData = (userHatList: UserList) => {
      try {
        // send??? ?????????
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
        console.log('message ?????? ?????? ??????', e);
      }
    };

    submitSubject = (subject: string) => {
      try {
        // send??? ?????????
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
        console.log('message ?????? ?????? ??????', e);
      }
    };
    //BW
    BWsend = (data: BrainWritingSendData) => {
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        this.StompClient.send(
          '/pub/api/brainwriting/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    };
    BWsendMessage = (sender: string, message: string) => {
      try {
        // send??? ?????????
        const data: BrainWritingSendData = {
          type: 'TALK',
          roomId: this._roomId,
          sender: sender,
          senderId: this._senderId,
          message: message,
        };
        this.BWsend(data);
      } catch (e) {
        console.log('message ?????? ?????? ??????', e);
      }
    };
  }

  

  return HandleSocket;
}
