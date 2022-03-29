import { createAction } from '@reduxjs/toolkit';
import { UserCount } from './types';

//createAction을 통해서 액션 생성하고 export하기 reducers.ts에서 사용
const prefix = 'count_user';

export const getUserCount = createAction<UserCount>(`${prefix}/GET_USER_COUNT`);
