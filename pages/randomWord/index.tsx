import React from 'react';
import { StartPage, InteractivePage } from '@components/common';
import { SelectWord, Setting } from '@components/layout/RandomWord';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateCurrentPage, randomWordSelector } from '@redux/modules/randomWord';

const RandomWord = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(randomWordSelector);

  const handleNextPage = (pageNum: number) => {
    dispatch(updateCurrentPage(pageNum));
  };

  const pages = [
    {
      component: (
        <StartPage
          title="Random Word"
          desc="학교 동아리, 게임 그룹, 세계 예술 감상 커뮤니티에 소속되어 유대감을 느낄 수 있는"
          onClick={() => handleNextPage(1)}
        />
      ),
    },
    {
      component: <Setting onClick={() => handleNextPage(2)} />,
    },
    {
      component: <SelectWord />,
    },
  ];

  return <InteractivePage pages={pages} currentPage={currentPage} />;
};
console.log('확인!');
export default RandomWord;
