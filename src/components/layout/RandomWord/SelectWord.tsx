import React, { useEffect } from 'react';
import { CenterLayout } from '../../common';
import { useAppDispatch } from '@redux/hooks';
import { getRandomWord } from '@redux/modules/randomWord';
import { SelectWordBox } from '../../layout/RandomWord/SelectWordBox';

const SelectWord = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  return (
    <CenterLayout>
      <SelectWordBox />
    </CenterLayout>
  );
};

export { SelectWord };
