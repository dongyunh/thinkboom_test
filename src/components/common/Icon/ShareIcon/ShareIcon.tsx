import React from 'react';
import Image from 'next/image';
import LinkImage from '../../../../../public/asset/IC_link.png';

const ShareIcon = () => {
  return <Image src={LinkImage} alt="공유하기 아이콘" width={50} height={50} />;
};

export { ShareIcon };
