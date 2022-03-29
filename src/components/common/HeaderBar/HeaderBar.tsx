import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { DarkModeToggle, CountingUser } from '../../common';
import Image from 'next/image';
import Logo from '../../../../public/asset/Logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderBar = () => {
  const router = useRouter();

  console.log(router);

  console.log(router.pathname.includes('/sixHat/debating/'));

  const showCpntCheckPathName = () => {
    if (router.pathname.includes('/sixHat/debating/')) {
      return (
        <CountingAndTimer>
          <DarkModeToggle />
          <CountingUser />
        </CountingAndTimer>
      );
    }
  };

  return (
    <StyledHeaderBar>
      <Link href="/">
        <a>
          <Image src={Logo} width="300" height="" />
        </a>
      </Link>
      <DarkModeToggle />
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
`;

const CountingAndTimer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { HeaderBar };
