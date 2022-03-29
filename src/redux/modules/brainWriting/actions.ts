import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
type GetNicknameArgType = {
    bwRoomId: string;
    nickname: string;
  };

type PostIdeaArgType={  
  bwRoomId: string | null;
  senderId: number | null;
  idea: string;
};

const prefix = 'brainWriting';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);

export const updateAdminState = createAction<boolean>(`${prefix}/UPDATE_ADMIN_STATE`);
export const getSubjectBW = createAction<string>(`${prefix}/GET_SUBJECT`);

export const changeIsSubmitState = createAction<boolean>(`${prefix}/CHANGE_IS_SUBMIT_STATE`);

export const clearChatHistory = createAction(`${prefix}/CLEAR_CHAT_HISTORY`);

export const getNickname = createAsyncThunk(
    `${prefix}/GET_NICKNAME`,
    async ({ bwRoomId, nickname }: GetNicknameArgType) => {
      console.log(bwRoomId, nickname);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/user/nickname/${bwRoomId}`,
        {
        //   bwRoomId: bwRoomId,
          nickname: nickname,
        },
      );
      return response.data;
    },
  );

  export const postIdea = createAsyncThunk(
    `${prefix}/POST_IDEA`,
    async ({ senderId, idea, bwRoomId }:PostIdeaArgType ) => {
      console.log(senderId, idea);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}//api/brainwriting/idea/${bwRoomId}`,
        {
          userId: senderId,
          idea: idea,

        },
      );
      return response.data;
    },
  );