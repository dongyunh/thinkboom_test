import React, { useState, useEffect } from 'react';
import { SelectHatBox } from '../SixHat';
import { CenterLayout, PrimaryButton } from '../../common';
import styled from 'styled-components';
import { useAppSelector } from '@redux/hooks';
import { selectSixHat } from '@redux/modules/sixHat';
import { HatType, UserList } from '@redux/modules/sixHat/types';
import useCheckSelectHat from '@hooks/useCheckSelectHat';

type SelectHatProps = {
  onClick?: (hat: HatType) => void;
  onClickComplete: () => void;
  onClickRandom: (userHatList: UserList) => void;
};

const SelectHat = ({ onClick, onClickComplete, onClickRandom }: SelectHatProps) => {
  const { myHat, isAdmin, userList } = useAppSelector(selectSixHat);
  const isAllHatSelect = useCheckSelectHat();
  const [disabled, setDisabled] = useState(!(isAdmin && isAllHatSelect));

  const handeOnClick = (hat: HatType) => {
    if (!onClick) return;
    onClick(hat);
  };

  useEffect(() => {
    setDisabled(!(isAdmin && isAllHatSelect));
  }, [isAllHatSelect]);

  const tmpSubject = '점심 뭐먹을까?';

  return (
    <CenterLayout>
      <>
        <Empty />
        <SelectHatBox
          subject={tmpSubject}
          userList={userList}
          myHat={myHat}
          onClickHat={handeOnClick}
          onClickRandom={onClickRandom}
        />
        <ButtonWrapper>
          <PrimaryButton text="완료" disabled={disabled} onClick={onClickComplete} />
        </ButtonWrapper>
      </>
    </CenterLayout>
  );
};

export { SelectHat };

const Empty = styled.div`
  height: 40px;
`;

const ButtonWrapper = styled.div`
  padding-top: 10px;
`;

// TODO : 유저 리스트에는 유저의 닉네임과 모자 정보가 담겨있어야한다. 해당 내용을 업데이트해주고, 관리하고 있는 상태가 있어야 한다.
