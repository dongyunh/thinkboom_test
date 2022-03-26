import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';
import { HatType } from '../../../../../redux/modules/sixHat/types';
import { HatImage } from '@components/common';

type MessageProps = {
  message: string | null;
  hatName: string | null;
  hat: HatType;
};

const Message = ({ message, hatName, hat }: MessageProps) => {
  return (
    <OtherMessageBox>
      <ProfileBox>
        <HatImage type={hat} width={30} height={30} />
        <HatName>{hatName}</HatName>
      </ProfileBox>
      <Box>{message}</Box>
    </OtherMessageBox>
  );
};

const OtherMessageBox = styled.div`
  display: flex;
  gap: 24px;
`;

const HatImg = styled.img`
  width: 50px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HatName = styled.span``;

const Box = styled.div`
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 406px;
`;

export { Message };
