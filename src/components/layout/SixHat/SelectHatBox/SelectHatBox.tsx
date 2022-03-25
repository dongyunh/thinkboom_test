import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../../theme/styleTheme';
import { Card } from '../../../common';
import { HatImage } from '@components/common';
import hatData from '../../../../mock/hatData';
import { UserList, HatType } from '@redux/modules/sixHat/types';

type SelectHatBoxProps = {
  subject: string;
  myHat: HatType;
  userList: UserList;
  onClickHat?: (arg: any) => void;
  onClickRandom: (userHatList: UserList) => void;
};

type StyleProps = {
  width?: number;
  height?: number;
  isMouseOver?: boolean;
};

const SelectHatBox = ({
  subject,
  myHat,
  userList,
  onClickHat,
  onClickRandom,
}: SelectHatBoxProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleOnClickHat = (hat: string) => {
    if (!onClickHat) return;
    onClickHat(hat);
  };

  return (
    <Container>
      <SubjectBox>
        {subject}
        <RandomButton onClick={() => onClickRandom(userList)}>랜덤</RandomButton>
      </SubjectBox>
      <DownBox>
        <UserListBox>
          <MyHatBox>
            <HatImage type={myHat} width={80} height={80} />
          </MyHatBox>
          <UserListColumn>
            {userList.map((user, idx) => {
              return (
                <UserProfile key={user.nickname}>
                  {user.hat !== null && <HatImage type={user.hat} width={20} height={20} />}
                  <UserNickname>{user.nickname}</UserNickname>
                </UserProfile>
              );
            })}
          </UserListColumn>
        </UserListBox>
        <CardListBox>
          {hatData.map((hat, idx) => {
            return (
              <Card width={200} height={200} key={idx}>
                {isMouseOver ? (
                  <HatBox isMouseOver={isMouseOver}>
                    <h3>{hat.text}</h3>
                    <DescText>{hat.desc}</DescText>
                    <TouchArea
                      onMouseOver={() => setIsMouseOver(true)}
                      onMouseOut={() => setIsMouseOver(false)}
                      onClick={() => handleOnClickHat(hat.value)}
                    />
                  </HatBox>
                ) : (
                  <HatBox>
                    <HatImage type={hat.value} width={100} />
                    <div>{hat.text}</div>
                    <TouchArea
                      onMouseOver={() => setIsMouseOver(true)}
                      onMouseOut={() => setIsMouseOver(false)}
                      onClick={() => handleOnClickHat(hat.value)}
                    />
                  </HatBox>
                )}
              </Card>
            );
          })}
        </CardListBox>
      </DownBox>
    </Container>
  );
};

const Container = styled.div`
  width: 1044px;
  height: 586px;
  border: 5px solid ${themedPalette.border_1};
  border-radius: 18px;
`;

const MyHatBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 18px;
  border: 5px solid ${themedPalette.border_1};
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubjectBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${themedPalette.black};
  color: ${themedPalette.main_text2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: relative;
`;

const RandomButton = styled.button`
  width: 70px;
  height: 45px;
  position: absolute;
  right: 70px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const DownBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const UserListBox = styled.div`
  width: 212px;
  height: 508px;
  border-right: 5px solid ${themedPalette.black};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const CardListBox = styled.div`
  width: 832px;
  height: 512px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  padding: 32px 48px;
`;

const UserListColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNickname = styled.div``;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const HatBox = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  ${props => props.isMouseOver && `background-color : #EEEEEE`};
`;

const TouchArea = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DescText = styled.span`
  text-align: center;
`;

export { SelectHatBox };

// NOTE : 이 페이지에서 처리해야 할 내용 1.모자선택시 로직 2.랜덤 로직
