import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from '../../../redux/modules/sixHat';
import {
  Title,
  PrimaryButton,
  SubjectTextField,
  HeaderBar,
  CountingUser,
} from '@components/common';

type WaitingRoomProps = {
  onClickSubmit?: (arg?: string) => void;
  onClickComplete?: () => void;
  onChange?: () => void;
};

const WaitingRoom = ({ onClickSubmit, onClickComplete, onChange }: WaitingRoomProps) => {
  const { isAdmin, subject, userCount } = useAppSelector(sixHatSelector);
  const handleOnclickSubmit = (arg?: string) => {
    if (!onClickSubmit) return;
    onClickSubmit(arg);
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
    <Grid>
      <Empty />
      <TextFieldWrapper>
        <Title text="회의 주제" />
        <SubjectTextField
          isAdmin={isAdmin}
          type="sixHat"
          onChange={handleOnChange}
          onClick={handleOnclickSubmit}
        />
      </TextFieldWrapper>
      <PrimaryButton text="완료" onClick={handleOnClickComplete} disabled={!(subject && isAdmin)} />
      <BackGroundImage />
    </Grid>
  );
};

const Grid = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0px;
  position: relative;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const BackGroundImage = styled.div`
  width: 110vw;
  height: 100vh;
  background-image: url('/asset/subject_background.png');
  background-size: cover;
  position: absolute;
  z-index: -10;
  bottom: 110px;
`;

const Empty = styled.div``;

export { WaitingRoom };
