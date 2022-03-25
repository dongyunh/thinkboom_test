import { createReducer } from '@reduxjs/toolkit';
import { Stats } from 'fs';
import {
  updateCurrentPage,
  getNickname,
  updateAdminState,
  changeIsSubmitState,
  getMessages,
  getUserHatInfo,
  getMyHat,
  getUserList,
  getRandomHatList,
  clearChatHistory,
} from './actions';
import { SixHatState } from './types';

const initialState: SixHatState = {
  currentPage: 0,
  nickname: null,
  senderId: null,
  isAdmin: false,
  isSubmit: false,
  chatHistory: [],
  subject: undefined,
  userList: [],
  myHat: 'red',
};

//createReducer로 reducer 생성.
export const sixHatReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(getNickname.fulfilled, (state, action) => {
      const { nickname, userId } = action.payload;
      state.nickname = nickname;
      state.senderId = userId;
    })
    .addCase(updateAdminState, (state, action) => {
      state.isAdmin = action.payload;
    })
    .addCase(changeIsSubmitState, (state, action) => {
      state.isSubmit = action.payload;
    })
    .addCase(getMessages, (state, action) => {
      if (state.chatHistory) {
        state.chatHistory = [action.payload, ...state.chatHistory];
      }
    })
    .addCase(getUserHatInfo, (state, action) => {
      const { nickname, hat } = action.payload;
      //닉네임만 뽑아낸 리스트
      const nicknameList = state.userList?.map(item => item.nickname);
      console.log(nicknameList);
      const idx = nicknameList.indexOf(nickname);
      state.userList[idx].hat = hat;
    })
    .addCase(getMyHat, (state, action) => {
      state.myHat = action.payload;
    })
    .addCase(getUserList, (state, action) => {
      if (state.userList.length === 0) {
        console.log('실행?');
        state.userList.push(action.payload);
        return;
      }
      const nicknameList = state.userList?.map(user => user.nickname);
      if (!nicknameList.includes(action.payload.nickname)) {
        state.userList.push(action.payload);
      }
    })
    .addCase(getRandomHatList, (state, action) => {
      const mappedList = new Map();
      action.payload.forEach(item => {
        mappedList.set(item.nickname, item.hat);
      });
      state.myHat = mappedList.get(state.nickname);
      state.userList = action.payload;
    })
    .addCase(clearChatHistory, state => {
      state.chatHistory = [];
    });
});

//객체가 담겨 있는 배열안에서, 특정 값을 가지고 있는지 확인하기.
