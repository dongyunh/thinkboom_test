import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../../theme/styleTheme';
const HatSrc = require('../../../../../../public/asset/hat.png');
import { HatType } from '../../../../../redux/modules/sixHat/types';
import { HatImage } from '@components/common';

type MessageProps = {
  isMe: boolean;
  message: string | null;
  hatName: string | null;
  hat: HatType;
};

type StyleProps = {
  isMe: boolean;
};

const Message = ({ isMe, message, hatName, hat }: MessageProps) => {
  return (
    <MessageBox isMe={isMe}>
      {isMe ? (
        <Box>{message}</Box>
      ) : (
        <OtherMessageBox>
          <ProfileBox>
            <HatImage type={hat} width={30} height={30} />
            <HatName>{hatName}</HatName>
          </ProfileBox>
          <Box>{message}</Box>
        </OtherMessageBox>
      )}
    </MessageBox>
  );
};

const MessageBox = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  justify-content: ${props => (props.isMe ? `flex-end` : 'flex-start')};
  align-items: flex-start;
  margin-bottom: 16px;
`;

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

const MyMessageBox = styled.div``;

export { Message };
