import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  color?: 'gray' | 'black';
  onClick?: () => void;
};

type StyleProps = {
  isError?: boolean;
  color: 'gray' | 'black';
};

const Button = ({ text, disabled, color = 'black', onClick }: ButtonProps) => {
  const handleOnClick = (e: any) => {
    if (!onClick) return;
    onClick();
  };

  return (
    <StyledButton color={color} disabled={disabled} onClick={handleOnClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyleProps>`
  border: none;
  align-items: center;
  border-radius: 12px;
  color: ${themedPalette.main_text2};
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 18px;
  transition: 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  cursor: pointer;

  ${props =>
    props.color === 'black'
      ? `background-color: ${themedPalette.modal_button_normal}`
      : `background-color: ${themedPalette.modal_gray_button_normal}`};

  :hover {
    background-color: ${themedPalette.modal_button_hover};
    color: ${themedPalette.main_text2};
  }

  :disabled {
    background-color: ${themedPalette.modal_button_disabled};
    color: ${themedPalette.main_text1};
    cursor: not-allowed;
  }
`;

export { Button };
