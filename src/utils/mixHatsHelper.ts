import { HatType, UserList } from '@redux/modules/sixHat/types';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

type User = { nickname: string; hat: HatType };

// 랜덤한 모자를 뿌려주는 Helper 함수
const mixHatsHelper = (users: UserList) => {
  const hats: HatType[] = ['red', 'green', 'yellow', 'black', 'white', 'blue'];
  let tmpHatArr = new Set(hats);
  const initialState: UserList = [];

  const mixHats = users.reduce((sumedUser: UserList, user, idx): UserList => {
    const randomNum = getRandomInt(0, tmpHatArr.size - 1);
    const randomHat = [...tmpHatArr][randomNum];
    const setedUser: User = {
      nickname: user.nickname,
      hat: randomHat,
    };

    tmpHatArr.delete(randomHat);
    if (tmpHatArr.size === 0) tmpHatArr = new Set(hats);

    sumedUser[idx] = setedUser;

    return sumedUser;
  }, initialState);

  return mixHats;
};

export default mixHatsHelper;
