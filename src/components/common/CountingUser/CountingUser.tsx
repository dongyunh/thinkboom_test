import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../../theme/styleTheme';
import UserCount from '../../../../public/asset/userCount.png';
import Image from 'next/image';
import { UserList } from '@redux/modules/sixHat/types';

type CountingUserProps = {
  totalUser?: number;
  currentUser?: number;
  userList?: UserList;
};

const CountingUser = ({ totalUser = 5, currentUser = 2, userList }: CountingUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnMouseOver = () => {
    setIsOpen(true);
  };

  const handleOnMouseOut = () => {
    setIsOpen(false);
  };

  const testUserList = ['호랑이귀여워', '고양이귀여워', '사자귀여워', '피자귀여워', '햄버거귀여워'];

  return (
    <Box>
      <TouchArea onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut} />
      <Image src={UserCount} width={25} height={25} />
      <Count>
        {currentUser > totalUser ? totalUser : currentUser}/{totalUser}
      </Count>
      {isOpen && (
        <UserListBox>
          {testUserList.map(user => {
            return <User key={user}>{user}</User>;
          })}
        </UserListBox>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 110px;
  height: 50px;
  border-radius: 50px;
  background-color: ${themedPalette.counting_user_bg};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const TouchArea = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Count = styled.div`
  color: ${themedPalette.main_text2};
`;

const UserListBox = styled.div`
  position: absolute;
  top: 70px;
  background-color: ${themedPalette.counting_user_bg};
  width: 110px;
  min-height: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0px;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${themedPalette.counting_user_bg};
    border-top: 0;
    margin-left: -10px;
    margin-top: -10px;
  }
`;

const User = styled.div`
  color: ${themedPalette.counting_user_text};
  font-size: 14px;
  padding-bottom: 5px;
`;

export { CountingUser };
