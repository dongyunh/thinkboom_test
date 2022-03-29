import React, { useState } from 'react';
import { Card } from '../Card';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sixHatSelector } from '@redux/modules/sixHat';
import { getSubjectRW } from '@redux/modules/randomWord/actions';
import { brainWritingSelector } from '../../../redux/modules/brainWriting/selectors';

type SubjectTextFieldProps = {
  type?: 'randomWord' | 'brainWriting' | 'sixHat';
  onChange?: (e: string) => void;
  onClick?: (arg?: string) => void;
  isAdmin?: boolean;
  BWisAdmin?: boolean;
};

type StyledProps = {
  disabled: boolean;
};

const SubjectTextField = ({
  type,
  onChange,
  onClick,
  isAdmin = true,
  BWisAdmin = true,
}: SubjectTextFieldProps) => {
  const dispatch = useAppDispatch();
  const { subject: enteredSubject } = useAppSelector(sixHatSelector);
  const [subject, setSubject] = useState<string>('');
  const { BWsubject: BWentredSubject } = useAppSelector(brainWritingSelector);
  const [BWsubject, setBWSubject] = useState<string>('');
  const handleGetSubject = () => {
    if (type == 'randomWord') {
      dispatch(getSubjectRW(subject));
      if (!onClick) return;
      onClick();
    }

    if (type == 'brainWriting') {
      if (!onClick) return;
      onClick(BWsubject);
    }

    if (type == 'sixHat') {
      if (!onClick) return;
      onClick(subject);
    }
  };

  return type === 'sixHat' ? (
    <Card width={600} height={124}>
      <TextFieldBox disabled={!isAdmin}>
        <TextField
          maxLength={28}
          defaultValue={enteredSubject}
          disabled={!isAdmin}
          onChange={e => setBWSubject(e.target.value)}
        />
        {isAdmin && (
          <Button onClick={handleGetSubject}>
            <ArrowIcon fontSize="large" />
          </Button>
        )}
      </TextFieldBox>
    </Card>
  ) : null || type === 'brainWriting' ? (
    <Card width={600} height={124}>
      <TextFieldBox disabled={!BWisAdmin}>
        <TextField
          maxLength={28}
          defaultValue={BWentredSubject}
          disabled={!BWisAdmin}
          onChange={e => setSubject(e.target.value)}
        />
        {BWisAdmin && (
          <Button onClick={handleGetSubject}>
            <ArrowIcon fontSize="large" />
          </Button>
        )}
      </TextFieldBox>
    </Card>
  ) : null;
};

const TextFieldBox = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0px 130px 0px 60px;
  cursor: not-allowed;
  ${props => props.disabled && `background-color: ${themedPalette.cute_button_disabled}`};
`;

const TextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;

  :disabled {
    background-color: ${themedPalette.cute_button_disabled};
    cursor: not-allowed;
  }
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
  :disabled {
    background-color: ${themedPalette.subject_button_disabled};
    cursor: not-allowed;
  }
`;

const ArrowIcon = styled(ArrowForwardIcon)`
  :hover {
    transform: translate(10px);
  }
`;

export { SubjectTextField };
