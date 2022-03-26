import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatData, UserData, HatType, UserList } from './types';
import axios from 'axios';
type GetNicknameArgType = {
  shRoomId: string;
  nickname: string;
};

const prefix = 'sixHat';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);
export const updateAdminState = createAction<boolean>(`${prefix}/UPDATE_ADMIN_STATE`);
export const getSubjectSH = createAction<string>(`${prefix}/GET_SUBJECT`);
export const changeIsSubmitState = createAction<boolean>(`${prefix}/CHANGE_IS_SUBMIT_STATE`);
export const getMessages = createAction<ChatData>(`${prefix}/GET_MESSAGES`);
export const getUserHatInfo = createAction<UserData>(`${prefix}/GET_USER_HAT_INFO`);
export const getMyHat = createAction<HatType>(`${prefix}/GET_MY_HAT`);
export const getUserList = createAction<UserData>(`${prefix}/GET_USER_LIST`);
export const getRandomHatList = createAction<UserList>(`${prefix}/GET_RANDOM_HAT_LIST`);
export const clearChatHistory = createAction(`${prefix}/CLEAR_CHAT_HISTORY`);

export const getNickname = createAsyncThunk(
  `${prefix}/GET_NICKNAME`,
  async ({ shRoomId, nickname }: GetNicknameArgType) => {
    console.log(shRoomId, nickname);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sixHat/user/nickname`,
      {
        shRoomId: shRoomId,
        nickname: nickname,
      },
    );
    return response.data;
  },
);
