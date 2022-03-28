import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateCurrentPage, sixHatSelector, updateAdminState } from '@redux/modules/sixHat';

export type message = {
  nickname: string;
  content: string;
};

export type MessageData = {
  roomId: number;
  sender: string;
  senderId: string;
  hat: null;
  message: string;
};

export class HandleSocket {
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
    this._roomId = roomId[0];

    this.StompClient.connect({ senderId: this._senderId }, () => {
      this.StompClient.subscribe(
        `/subSH/api/sixHat/rooms/${roomId}`,
        data => {
          const newMessage: message = JSON.parse(data.body) as message;
          console.log(newMessage);
        },
        { senderId: this._senderId },
      );
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

  sendMessage = (sender: string, message: string) => {
    try {
      // send할 데이터
      const data = {
        type: 'TALK',
        roomId: this._roomId,
        sender: sender,
        senderId: this._senderId,
        hat: null,
        message: message,
      };
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        console.log(data);
        this.StompClient.send(
          '/pubSH/api/sixHat/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    } catch (e) {
      console.log('message 소켓 함수 에러', e);
    }
  };

  sendHatData = (sender: string | null, hat: string) => {
    try {
      // send할 데이터
      const data = {
        type: 'HAT',
        roomId: this._roomId,
        sender: sender,
        senderId: this._senderId,
        hat: hat,
        message: null,
      };
      this.waitForConnection(this.StompClient, () => {
        this.StompClient.debug = () => {};
        console.log(data);
        this.StompClient.send(
          '/pubSH/api/sixHat/chat/message',
          { senderId: this._senderId },
          JSON.stringify(data),
        );
      });
    } catch (e) {
      console.log('message 소켓 함수 에러', e);
    }
  };
}
