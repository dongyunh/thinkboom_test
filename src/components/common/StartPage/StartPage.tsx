import React from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { HeaderBar, Card, Button } from '../../common';

type StartProps = {
  title: string;
  desc: string;
  onClick?: () => void;
};

const StartPage = ({ title, desc, onClick }: StartProps) => {
  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
  };
  return (
    <>
      <HeaderBar>
        <h1>ThinkBoom</h1>
      </HeaderBar>
      <Grid>
        <ContentWrapper>
          <RightContent>
            <h1>{title}</h1>
            <p>{desc}</p>
            <ButtonWrapper>
              <Button text="시작하기" onClick={handleOnClick} />
            </ButtonWrapper>
          </RightContent>
          <Card width={600} height={350} />
        </ContentWrapper>
      </Grid>
    </>
  );
};

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 200px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  width: 220px;
`;

export { StartPage };
