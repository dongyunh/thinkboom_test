import { createReducer } from '@reduxjs/toolkit';
import {
  updateCurrentPage,
  selectWord,
  getRandomWord,
  postPickedWords,
  getSubject,
  getResultWord,
} from './actions';

export type RandomWordState = {
  currentPage: number;
  randomWordList: string[];
  pickedWordList: string[];
  pending: boolean;
  error: boolean;
  subject: string | null;
};

const initialState: RandomWordState = {
  currentPage: 0,
  randomWordList: [],
  pickedWordList: [],
  pending: false,
  error: false,
  subject: null,
};

//createReducer로 reducer 생성.
export const randomWordReducer = createReducer(initialState, builder => {
  builder
    .addCase(updateCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(selectWord, (state, action) => {
      if (state.pickedWordList.length > 5) return;
      const { word, idx } = action.payload;
      state.randomWordList[idx] = '';
      console.log(state.randomWordList);
      state.pickedWordList.push(word);
    })
    .addCase(getRandomWord.pending, state => {
      state.pending = true;
    })
    .addCase(getRandomWord.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.randomWordList = payload;
    })
    .addCase(getRandomWord.rejected, state => {
      state.pending = false;
      state.error = true;
    })
    .addCase(postPickedWords.fulfilled, state => {
      state.pending = false;
    })
    .addCase(getSubject, (state, action) => {
      state.subject = action.payload;
    })
    .addCase(getResultWord.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.pickedWordList = payload;
    });
});
