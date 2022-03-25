import React from 'react';
import Image from 'next/image';
import Yellow from '../../../../public/asset/yellowhat.png';
import Green from '../../../../public/asset/greenhat.png';
import Red from '../../../../public/asset/redhat.png';
import White from '../../../../public/asset/whitehat.png';
import Black from '../../../../public/asset/hat.png';
import Blue from '../../../../public/asset/bluehat.png';
import { HatType } from '@redux/modules/sixHat/types';

type HatImageProps = {
  type: HatType;
  width?: number;
  height?: number;
};

const HatImage = ({ type, width, height }: HatImageProps) => {
  const hatSrc = (type: HatType) => {
    const hatType = {
      white: White,
      red: Red,
      black: Black,
      blue: Blue,
      green: Green,
      yellow: Yellow,
    };

    return hatType[type];
  };

  return <Image src={hatSrc(type)} width={width} height={height} />;
};

export { HatImage };
