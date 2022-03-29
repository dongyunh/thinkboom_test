import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import { CenterLayout, PrimaryButton } from '../../common';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postIdea } from '../../../redux/modules/brainWriting/actions';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';

type CardProps = {
  width: number;
  height: number;
  subject: string;
  onClickComplete: () => void;
};
type StyleProps = {
  width: number;
  height: number;
};

const BwCard = ({ width, height, subject, onClickComplete }: CardProps) => {
  const dispatch = useAppDispatch();
  const { senderId, bwRoomId } = useAppSelector(brainWritingSelector);
  const [disabled, setDisabled] = useState();
  const [idea, setidea] = useState<string>('');
  const SendIdea = () => {
    dispatch(postIdea({ senderId: senderId, idea: idea, bwRoomId: bwRoomId }));
  };

  return (
    <CenterLayout>
      <>
        <CardWrapper>
          <StyledCard width={width} height={height}>
            <StlyeSubject>{subject}</StlyeSubject>
            <StyledIdea onChange={e => setidea(e.target.value)}>test11</StyledIdea>
            <StyledButton onClick={SendIdea}>작성</StyledButton>
          </StyledCard>
        </CardWrapper>
        <ButtonWrapper>
          <PrimaryButton text="완료" disabled={disabled} onClick={onClickComplete} />
        </ButtonWrapper>
      </>
    </CenterLayout>
  );
};

const CardWrapper = styled.div`
  position: relative;
  margin-top: 150px;
`;
const ButtonWrapper = styled.div`
  padding-top: 10px;
  margin: auto;
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

const StyledIdea = styled.textarea`
  height: 60%;
  width: 82%;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 20px;
`;

const StyledButton = styled.button`
  height: 12%;
  width: 82%;
  background-color: ${themedPalette.component_2};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 12px;
  position: relative;
  text-align: center;
  margin: 17px;
  cursor: pointer;
  font-size: 20px;
`;

export { BwCard };
