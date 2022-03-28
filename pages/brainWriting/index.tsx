import React, { useEffect } from 'react';
import { InteractivePage, StartPage, MakeRoomModal } from '../../src/components/common';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  updateCurrentPage,
  brainWritingSelector,
  updateAdminState,
} from '@redux/modules/brainWriting';
import { useRouter } from 'next/router';
import axios from 'axios';

const BrainWriting = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(brainWritingSelector);

  const handleNextPage = (pageNum: number) => {
    dispatch(updateCurrentPage(pageNum));
  };

  const handleMoveSettingPage = (title: string | null, roomId: string) => {
    console.log(title);
    console.log(roomId);
    router.push(`/brainWriting/devating/${title}/${roomId}`);
  };

  const handleUpdateAmdinState = () => {
    dispatch(updateAdminState(true));
  };

  // TODO : 서버 주소 나오면 api 한곳에 모으기, 비동기 작업들 리덕스로 옮기기
  const handleMakeNewPage = async (title: string | null, headCount: number, time: number) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/brainwriting/rooms`, {
        title,
        headCount,
        time,
      })
      .then(res => {
        console.log(res);
        const { roomId } = res.data;
        handleMoveSettingPage(title, roomId);
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
          pageType="brainwriting"
          title="브레인라이팅"
          desc="각자 주제에 대해 생각나는 아이디어들을 적은 뒤 서로 돌려가며 아이디어를 공유 및 투표합니다."
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

export default BrainWriting;

/*
TODO : 1.이 페이제에서 나갈 때, currentPage 0으로 초기화하기 
*/
