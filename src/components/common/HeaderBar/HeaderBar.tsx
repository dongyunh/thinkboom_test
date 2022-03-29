import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { DarkModeToggle, CountingUser } from '../../common';
import Image from 'next/image';
import Logo from '../../../../public/asset/Logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '@redux/hooks';
import { selectUserCount } from '@redux/modules/CountUser';

const HeaderBar = () => {
  const router = useRouter();
  const { userCount } = useAppSelector(selectUserCount);

  const showCpntCheckPathName = () => {
    if (router.pathname.includes('/sixHat/debating/')) {
      return (
        <CountingAndTimer>
          <DarkModeToggle />
          <CountingUser totalUser={userCount.totalUser} currentUser={userCount.currentUser} />
        </CountingAndTimer>
      );
    }

    if (router.pathname == '/') {
      return <DarkModeToggle />;
    }
  };

  return (
    <StyledHeaderBar>
      <Link href="/">
        <a>
          <Image src={Logo} width="300" height="" />
        </a>
      </Link>
      {showCpntCheckPathName()}
    </StyledHeaderBar>
  );
};

const StyledHeaderBar = styled.header`
  width: 100vw;
  height: 80px;
  padding: 0px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  cursor: pointer;
  z-index: 99;
`;

const CountingAndTimer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export { HeaderBar };
