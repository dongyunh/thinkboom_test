import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectPermit = (state: RootState) => state.permit;

export const countSelector = createSelector(selectPermit, state => state);
