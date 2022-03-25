import React from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { HeaderBar, Card, PrimaryButton } from '../../common';
import { themedPalette } from '../../../theme';
import SixHat from '../../../../public/asset/6hat.png';
import RandomWord from '../../../../public/asset/randomWord.png';
import BrainWriting from '../../../../public/asset/brainWriting.png';
import Image from 'next/image';


type StartProps = {
  title: string;
  desc: string;
  pageType: 'sixhat' | 'randomword' | 'brainwriting';
  onClick?: () => void;
};

const StartPage = ({ title, desc, onClick, pageType }: StartProps) => {
  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
  };

  const ImageObj = {
    sixhat: SixHat,
    randomword: RandomWord,
    brainwriting: BrainWriting,
  };

  return (
    <Grid>
      <ContentWrapper>
        <RightContent>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
          <ButtonWrapper>
            <PrimaryButton text="시작하기" onClick={handleOnClick} />
          </ButtonWrapper>
        </RightContent>
        <ImageWrapper>
          <Image src={ImageObj[pageType]} width={600} height={350} />
        </ImageWrapper>
        {/* <Card width={600} height={350} /> */}
      </ContentWrapper>
    </Grid>
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

const Title = styled.h1`
  font-size: 40px;
  color: ${themedPalette.main_text1};
  margin: 0;
`;

const Desc = styled.p`
  max-width: 310px;
  letter-spacing: 1.5px;
  color: ${themedPalette.main_text1};
  padding: 10px 0px;
`;

const ImageWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 18px;
  overflow: hidden;
`;


export { StartPage };
