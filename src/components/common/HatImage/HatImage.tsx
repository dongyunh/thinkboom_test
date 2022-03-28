import React from 'react';
import Image from 'next/image';
import Yellow from '../../../../public/asset/hats/hat_yellow.png';
import Green from '../../../../public/asset/hats/hat_green.png';
import Red from '../../../../public/asset/hats/hat_red.png';
import White from '../../../../public/asset/hats/hat_white.png';
import Black from '../../../../public/asset/hats/hat_black.png';
import Blue from '../../../../public/asset/hats/hat_blue.png';
import My_Yellow from '../../../../public/asset/hats/hat_yellow_chat.png';
import My_Blue from '../../../../public/asset/hats/hat_blue_chat.png';
import My_Green from '../../../../public/asset/hats/hat_green_chat.png';
import My_Red from '../../../../public/asset/hats/hat_red_chat.png';
import My_White from '../../../../public/asset/hats/hat_white_chat.png';
import My_Black from '../../../../public/asset/hats/hat_black_chat.png';
import Null_Hat from '../../../../public/asset/hats/hat_null.png';

import { HatType } from '@redux/modules/sixHat/types';

type HatImageProps = {
  type: HatType;
  width?: number;
  height?: number;
  isMe?: boolean;
};

type HatImageType = {
  [key in HatType]: any;
};

const HatImage = ({ type, width, height, isMe }: HatImageProps) => {
  const hatSrc = (type: HatType, _isMe?: boolean) => {
    const hatType: HatImageType = {
      white: White,
      red: Red,
      black: Black,
      blue: Blue,
      green: Green,
      yellow: Yellow,
      none: Null_Hat,
    };

    const myHatType: HatImageType = {
      white: My_White,
      red: My_Red,
      black: My_Black,
      blue: My_Blue,
      green: My_Green,
      yellow: My_Yellow,
      none: Null_Hat,
    };

    return _isMe ? myHatType[type] : hatType[type];
  };

  return <Image src={hatSrc(type, isMe)} width={width} height={height} />;
};

export { HatImage };
