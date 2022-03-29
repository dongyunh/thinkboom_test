import React, { useState, useEffect } from 'react';
import { ResultModal } from '../../../src/components/common/Modals';
import { GetServerSideProps } from 'next';
import { CenterLayout, PrimaryButton } from '@components/common';
import styled from 'styled-components';
import { themedPalette } from '../../../src/theme/styleTheme';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectRandomWord, getResultWord } from '@redux/modules/randomWord';
import axios from 'axios';
import { useRouter } from 'next/router';

type ResultProps = {
  rwId: string;
};

const Result = ({ rwId }: ResultProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pickedWordList } = useAppSelector(selectRandomWord);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleConfirm = () => {
    setIsOpen(false);
    router.replace('/');
  };

  const handleDontShare = () => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/randomWord/share/${rwId}`);
    router.replace('/');
  };

  useEffect(() => {
    dispatch(getResultWord(rwId));
  }, []);

  return (
    <CenterLayout>
      <>
        <Title>선택된 단어</Title>
        <ResultGrid>
          {pickedWordList?.map((word, idx) => {
            return <Word key={idx}>{word}</Word>;
          })}
        </ResultGrid>
        <PrimaryButton text="완료" onClick={() => setIsOpen(true)} />
        {isOpen && <ResultModal onClickBtn1={handleDontShare} onClickBtn2={handleConfirm} />}
      </>
    </CenterLayout>
  );
};

const Title = styled.h1`
  color: ${themedPalette.main_text1};
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 80px;
  row-gap: 66px;
  padding: 20px 0px 80px 0px;
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

export default Result;

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { rwId } = query;
  return {
    props: {
      rwId,
    },
  };
};
