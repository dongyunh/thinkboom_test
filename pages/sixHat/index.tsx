import React, { useEffect } from 'react';
import { InteractivePage, StartPage, MakeRoomModal } from '../../src/components/common';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateCurrentPage, sixHatSelector, updateAdminState } from '@redux/modules/sixHat';
import { useRouter } from 'next/router';
import axios from 'axios';

const SixHat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(sixHatSelector);

  const handleNextPage = (pageNum: number) => {
    dispatch(updateCurrentPage(pageNum));
  };

  const handleMoveSettingPage = (title: string | null, roomId: number) => {
    router.push(`/sixHat/devating/${title}/${roomId}`);
  };

  const handleUpdateAmdinState = () => {
    dispatch(updateAdminState(true));
  };

  // TODO : 서버 주소 나오면 api 한곳에 모으기, 비동기 작업들 리덕스로 옮기기
  const handleMakeNewPage = async (title: string | null, headCount: number, timer: number) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/sixHat/rooms`, { title, headCount, timer })
      .then(res => {
        const { shRoomId } = res.data;
        handleMoveSettingPage(title, shRoomId);
        handleUpdateAmdinState();
      });
  };

  useEffect(() => {
    return () => {
      dispatch(updateCurrentPage(0));
    };
  }, []);

  const pages = [
    {
      component: (
        <StartPage
          pageType="sixhat"
          title="6가지 모자"
          desc="여섯가지 색상의 모자가 지닌 역할에 맞춰 생각함으로써 다양한 측면에서 폭넓은 사고를 할 수 있도록 도와주는 기법입니다."
          onClick={() => handleNextPage(1)}
        />
      ),
    },
    {
      component: <MakeRoomModal onClickButton={handleMakeNewPage} />,
    },
  ];

  return <InteractivePage pages={pages} currentPage={currentPage} />;
};

export default SixHat;

/*
TODO : 1.이 페이제에서 나갈 때, currentPage 0으로 초기화하기 
*/
