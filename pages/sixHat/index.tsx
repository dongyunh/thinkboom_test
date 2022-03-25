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
          title="Six Thinking Hat"
          desc="학교 동아리, 게임 그룹, 세계 예술 감상 커뮤니티에 소속되어 유대감을 느낄 수 있는"
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
