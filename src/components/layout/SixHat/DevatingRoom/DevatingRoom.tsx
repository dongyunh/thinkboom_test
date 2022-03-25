import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../../../common';
import { DevatingChatBox } from '../DevatingChatBox';

type DevatingRoom = {
  onClick: (arg: string) => void;
};

const DevatingRoom = ({ onClick }: DevatingRoom) => {
  return (
    <CenterLayout>
      <DevatingChatBox onClick={onClick} />
    </CenterLayout>
  );
};

export { DevatingRoom };
