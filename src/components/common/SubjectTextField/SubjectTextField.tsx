import React, { useState } from 'react';
import { Card } from '../Card';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch } from '../../../redux/hooks';
import { getSubjectRW } from '@redux/modules/randomWord/actions';
import { getSubjectSH } from '@redux/modules/sixHat/actions';

type SubjectTextFieldProps = {
  type?: 'randomWord' | 'sixHat';
  onChange?: (e: string) => void;
  onClick?: () => void;
};

const SubjectTextField = ({ type, onChange, onClick }: SubjectTextFieldProps) => {
  const dispatch = useAppDispatch();
  const [subject, setSubject] = useState<string>('');

  const handleGetSubject = () => {
    if (type == 'randomWord') {
      dispatch(getSubjectRW(subject));
      if (!onClick) return;
      onClick();
    }

    if (type == 'sixHat') {
      dispatch(getSubjectSH(subject));
      if (!onClick) return;
      onClick();
    }
  };

  return (
    <Card width={784} height={124}>
      <TextFieldBox>
        <TextField onChange={e => setSubject(e.target.value)} />
        <Button onClick={handleGetSubject}>
          <ArrowIcon fontSize="large" />
        </Button>
      </TextFieldBox>
    </Card>
  );
};

const TextFieldBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0px 130px 0px 60px;
`;

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
`;

const Button = styled.button`
  background-color: ${themedPalette.button_1};
  height: 100%;
  width: 120px;
  box-sizing: border-box;
  border: none;
  position: absolute;
  color: ${themedPalette.main_text2};
  border-radius: 18px 12px 12px 18px;
  right: 0;
  cursor: pointer;
`;

const ArrowIcon = styled(ArrowForwardIcon)`
  :hover {
    transform: translate(10px);
  }
`;

export { SubjectTextField };
