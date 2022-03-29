import { createReducer } from '@reduxjs/toolkit';
import { updateCurrentPage, getNickname, updateAdminState, clearChatHistory, changeIsSubmitState, getSubjectBW, postIdea } from './actions';
import {BrainWritingState} from './types'



const initialState: BrainWritingState = {
  currentPage: 0,
  nickname: null,
  BWisAdmin: false,
  BWisSubmit: false,
  BWsubject : undefined,
  senderId: null,
  idea: null,
  userId: null,
  chatHistory: [],
  bwRoomId: null,
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
    .addCase(changeIsSubmitState, (state, action) => {
      console.log(action.payload)
      state.BWisSubmit = action.payload;
    })
    .addCase(updateAdminState, (state, action) => {
      state.BWisAdmin = action.payload;
    })
    .addCase(clearChatHistory, state => {
      state.chatHistory = [];
    })
    .addCase(getSubjectBW, (state, action) => {
      console.log(action.payload)
      state.BWsubject = action.payload;
    })
    .addCase(postIdea.fulfilled, (state, action) => {
      const { userId, idea } = action.payload;
      state.idea = idea;
      state.userId = userId;
    })
});
