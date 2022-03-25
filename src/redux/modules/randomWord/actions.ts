import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { useRouter } from 'next/router';

type SelectWordPayload = {
  word: string;
  idx: number;
};

type ResponseType = {
  data: {
    rwId: string;
    wordList: string[];
  };
};

const prefix = 'randomWord';

export const updateCurrentPage = createAction<number>(`${prefix}/UPDATE_CURRENT_PAGE`);
export const selectWord = createAction<SelectWordPayload>(`${prefix}/SELECT_WORD`);
export const getSubject = createAction<string>(`${prefix}/GET_SUBJECT`);

export const getRandomWord = createAsyncThunk(`${prefix}/GET_RANDOM_WORD`, async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/randomWord`);
  return response.data;
});

export const getResultWord = createAsyncThunk(`${prefix}/GET_RESULT_WORD`, async (rwId: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery/randomWord/${rwId}`);
  console.log(response.data.wordList);
  return response.data.wordList;
});

export const postPickedWords = createAsyncThunk(
  `${prefix}/POST_PICKED_WORDS`,
  async (arg, { getState }) => {
    const { randomWord } = getState() as RootState;
    const { pickedWordList } = randomWord;

    const response: ResponseType = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/randomWord`,
      {
        wordList: pickedWordList,
      },
    );
    console.log(response.data.rwId);
  },
);
