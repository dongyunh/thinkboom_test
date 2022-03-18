import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { Main } from '@components/layout/Main';
import { useRouter } from 'next/router';
import { DarkModeToggle } from '@components/common/DarkModeToggle';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Main>
      <>
        <Main.HeaderBar>
          <>
            <h1>ThinkBoom</h1>
            <NavWrapper>
              <DarkModeToggle />
            </NavWrapper>
          </>
        </Main.HeaderBar>
        <Grid>
          <CardWrapper>
            <Main.Card width={315} height={400} onMouseUp={() => router.push('/randomWord')}>
              <CardContent>
                <h2>랜덤워드</h2>
                <p>참신한 주제가 필요하다면?</p>
                <p>1인용</p>
              </CardContent>
            </Main.Card>
            <Main.Card width={315} height={400}>
              <CardContent>
                <h2>브레인 라이팅</h2>
                <p>다양한 의견을 공유하고 싶다면?</p>
                <p>8인용</p>
              </CardContent>
            </Main.Card>
            <Main.Card width={315} height={400} onMouseUp={() => router.push('/sixHat')}>
              <CardContent>
                <h2>6가지 생각모자</h2>
                <p>새로운 관점에서 문제를 바라보고 싶다면?</p>
                <p>8인용</p>
              </CardContent>
            </Main.Card>
          </CardWrapper>
        </Grid>
      </>
    </Main>
  );
};

export default Home;

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 30%;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
