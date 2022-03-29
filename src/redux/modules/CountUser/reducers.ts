import { createReducer } from '@reduxjs/toolkit';
import { getUserCount } from './actions';
import { UserCountState } from './types';

//initialState 선언
const initalState: UserCountState = {
  userCount: {
    currentUser: 0,
    totalUser: 0,
  },
};

//createReducer로 reducer 생성.
export const userCountReducer = createReducer(initalState, builder => {
  builder.addCase(getUserCount, (state, action) => {
    state.userCount = action.payload;
  });
});
