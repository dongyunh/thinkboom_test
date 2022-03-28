import { createReducer } from '@reduxjs/toolkit';
import { updateCurrentPage, getNickname, updateAdminState,clearChatHistory } from './actions';
import {BrainWritingState} from './types'



const initialState: BrainWritingState = {
  currentPage: 0,
  nickname: null,
  isAdmin: false,
  senderId: null,
  chatHistory: [],
};

//createReducer로 reducer 생성.
export const brainWritingReducer = createReducer(initialState, builder => {
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
    .addCase(clearChatHistory, state => {
      state.chatHistory = [];
    })
});
