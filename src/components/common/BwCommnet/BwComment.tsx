import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { CenterLayout } from '../../common';
type CardProps = {
  width: number;
  height: number;
  subject: string;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwComment = ({ width, height, subject }: CardProps) => {
  return (
    <CenterLayout>
      <>
        <h2>코멘트를 남겨주세요</h2>
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <StyledIdea>TEST11</StyledIdea>
            <StyledInput />
          </StyledCard>
        </CardWrapper>
      </>
    </CenterLayout>
  );
};

const CardWrapper = styled.div`
  position: relative;
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  text-align: center;
  margin: auto;
`;

const StlyeSubject = styled.h3`
  text-align: center;
  font-size: 28px;
`;

const StyledIdea = styled.div`
  height: 60%;
  width: 82%;
  /* border: 5px solid ${themedPalette.border_1}; */
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
`;

const StyledInput = styled.textarea`
  height: 22%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: 17px;
  font-size: 20px;
`;

export { BwComment };
