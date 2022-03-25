import React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../HeaderBar';
import { SubjectTextField } from '../SubjectTextField';
import { PrimaryButton } from '../PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from '../../../redux/modules/sixHat';
import { Title, Desc } from '../../common';

type WaitingRoomProps = {
  onClickSubmit?: () => void;
  onClickComplete?: () => void;
  onChange?: () => void;
};

const WaitingRoom = ({ onClickSubmit, onClickComplete, onChange }: WaitingRoomProps) => {
  const { isAdmin, isSubmit } = useAppSelector(sixHatSelector);
  const handleOnclickSubmit = () => {
    if (!onClickSubmit) return;
    onClickSubmit();
  };

  const handleOnClickComplete = () => {
    if (!onClickComplete) return;
    onClickComplete();
  };

  const handleOnChange = () => {
    if (!onChange) return;
    onChange();
  };

  return (
    <>
      <HeaderBar>
        <Title text="ThinkBoom" />
      </HeaderBar>
      <Grid>
        <Empty />
        <TextFieldWrapper>
          <Title text="회의 주제" />
          <SubjectTextField onChange={handleOnChange} onClick={handleOnclickSubmit} />
        </TextFieldWrapper>
        <PrimaryButton text="완료" onClick={handleOnClickComplete} disabled={isSubmit && isAdmin} />
      </Grid>
    </>
  );
};

const Grid = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Empty = styled.div``;

export { WaitingRoom };
