import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import Dark from '../../../../public/asset/dark.png';
import White from '../../../../public/asset/white.png';
import { useToggleTheme } from '../../../hooks/useToggleTheme';

const DarkModeToggle = ({}) => {
  const [theme, toggle] = useToggleTheme();

  return (
    <ToggleWrapper>
      <WhiteCircle onClick={() => toggle('light')}>
        <Image src={White} width={20} height={20} />
      </WhiteCircle>
      <DarkCircle onClick={() => toggle('dark')}>
        <Image src={Dark} width={20} height={20} />
      </DarkCircle>
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 30px;
  border: 5px solid ${themedPalette.toggle_border};
  background-color: ${themedPalette.toggle_bg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${themedPalette.toggle_white_circle};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DarkCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${themedPalette.toggle_dark_circle};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export { DarkModeToggle };
