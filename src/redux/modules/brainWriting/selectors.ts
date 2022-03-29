import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectBrainWriting = (state: RootState) => state.brainWriting;

export const brainWritingSelector = createSelector(selectBrainWriting, state => state);
