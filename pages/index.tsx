import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { Main } from '@components/layout/Main';
import { useRouter } from 'next/router';
import { DarkModeToggle } from '@components/common/DarkModeToggle';
import { useAppDispatch } from '@redux/hooks';
import { enableDarkMode, enableLightMode } from '@redux/modules/darkMode';

import { Title, Desc } from '../src/components/common';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loadTheme = () => {
    const theme = localStorage.getItem('theme');
    if (!theme) return;
    if (theme === 'dark') {
      dispatch(enableDarkMode());
    } else {
      dispatch(enableLightMode());
    }
    document.body.dataset.theme = 'light';
  };

  useEffect(() => {
    localStorage.removeItem('persist:root');
    loadTheme();
  }, []);

  return (
    <Main>
      <>
        <Grid>
          <CardWrapper>
            <Main.Card width={315} height={400} onMouseUp={() => router.push('/randomWord')}>
              <CardContent>
                <Title text="랜덤워드" />
                <Desc text="참신한 주제가 필요하다면?" />
                <Desc text="1인용" />
              </CardContent>
            </Main.Card>
            <Main.Card width={315} height={400}>
              <CardContent>
                <Title text="브레인 라이팅" />
                <Desc text="다양한 의견을 공유하고 싶다면?" />
                <Desc text="8인용" />
              </CardContent>
            </Main.Card>
            <Main.Card width={315} height={400} onMouseUp={() => router.push('/sixHat')}>
              <CardContent>
                <Title text="6가지 생각모자" />
                <Desc text="새로운 관점에서 문제를 바라보고 싶다면?" />
                <Desc text="8인용" />
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
