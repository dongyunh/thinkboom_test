import React, { useState, useEffect } from 'react';
import { ResultModal } from '../../common/Modals';
import { GetServerSideProps } from 'next';
import { CenterLayout } from '@components/common';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectRandomWord, getResultWord } from '@redux/modules/randomWord';

type ResultProps = {
  rwId: string;
};

const Result = ({ rwId }: ResultProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pickedWordList } = useAppSelector(selectRandomWord);
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log('여기에는 공유를 취소하는 api가 들어올 것입니다. ');
  };

  useEffect(() => {
    dispatch(getResultWord(rwId));
  }, []);

  return (
    <CenterLayout>
      <>
        <Title>선택된 단어</Title>
        <ResultGrid>
          {/* {pickedWordList?.map((word, idx) => {
            return <Word key={idx}>{word}</Word>;
          })} */}
        </ResultGrid>
        {isOpen && <ResultModal onClickBtn1={handleCancel} onClickBtn2={handleConfirm} />}
      </>
    </CenterLayout>
  );
};

const Title = styled.h1`
  color: ${themedPalette.main_text1};
  padding-bottom: 20px;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 80px;
  row-gap: 66px;
`;

const Word = styled.div`
  width: 318px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  font-size: 20px;
`;

export { Result };

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { rwId } = query;
  return {
    props: {
      rwId,
    },
  };
};
