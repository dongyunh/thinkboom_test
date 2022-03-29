import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectUserCount = (state: RootState) => state.userCount;

export const countSelector = createSelector(selectUserCount, state => state);
