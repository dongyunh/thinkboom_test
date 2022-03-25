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
          pageType="randomword"
          desc="주제와 전혀 관련없는 단어들을 선택하여 그 단어에서 연상되는 의미와 주제를 연계시켜 아이디어를 도출해내는 기법입니다."
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
