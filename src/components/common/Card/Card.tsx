import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';

type CardProps = {
  width: number;
  height: number;
  children?: React.ReactChild;
};

type StyleProps = {
  width: number;
  height: number;
};

const Card = ({ width, height, children }: CardProps) => {
  return (
    <CardWrapper>
      <StyledCard width={width} height={height}>
        {children}
      </StyledCard>
      <AfterCard width={width} height={height} />
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledCard = styled.div<StyleProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  position: relative;
  transition: 0.2s ease-in-out;
  overflow: hidden;

  :hover {
    transform: translate(8px, 8px);
  }
`;

const AfterCard = styled.div<StyleProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${themedPalette.card_bg_normal};
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  z-index: -1;
  left: 8px;
  top: 8px;
`;

export { Card };
