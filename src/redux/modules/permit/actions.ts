import { createAction } from '@reduxjs/toolkit';
import { UserCount } from './types';

//createAction을 통해서 액션 생성하고 export하기 reducers.ts에서 사용
const prefix = 'permit';

export const setRoutingModalOpen = createAction<boolean>(`${prefix}/SET_ROUTING_MODAL_OPEN`);
