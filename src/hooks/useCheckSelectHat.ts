import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@redux/hooks';
import { sixHatSelector } from '@redux/modules/sixHat';

const useCheckSelectHat = () => {
  const [isAllSelect, setIsAllSelect] = useState(false);
  const { userList } = useAppSelector(sixHatSelector);

  useEffect(() => {
    const hatList = userList.map(user => user.hat);
    if (hatList.includes(null)) setIsAllSelect(false);
    else setIsAllSelect(true);
  }, [userList]);

  return isAllSelect;
};

export default useCheckSelectHat;
