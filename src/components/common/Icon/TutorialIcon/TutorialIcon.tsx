import React, { useState } from 'react';
import Image from 'next/image';
import Tutorial from '../../../../../public/asset/IC_help.png';
import BrainWriting from '../../../../../public/asset/tutorial_brainWriting.png';
import RandomWord from '../../../../../public/asset/tutorial_randomWord.png';
import SixHat from '../../../../../public/asset/tutorial_sixhat.png';

import styled from 'styled-components';

type TutorialIconProps = {
  type: 'brainWriting' | 'sixHat' | 'randomWord';
};

const TutorialIcon = ({ type }: TutorialIconProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tutorialImgObj = {
    brainWriting: BrainWriting,
    sixHat: SixHat,
    randomWord: RandomWord,
  };

  const handleOnMouseOver = () => {
    setIsOpen(true);
  };

  const handleOnMouseOut = () => {
    setIsOpen(false);
  };

  return (
    <TutorialWrapper>
      {isOpen && (
        <TutorialImg>
          <Image src={tutorialImgObj[type]} width="500px" height="600px" />
        </TutorialImg>
      )}
      <Image
        src={Tutorial}
        width={50}
        height={50}
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
      />
    </TutorialWrapper>
  );
};

const TutorialWrapper = styled.div`
  position: relative;
`;

const TutorialImg = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0px;
  width: 500px;
`;

export { TutorialIcon };
