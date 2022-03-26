import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PrimaryButton } from './PrimaryButton';
// import GlobalStyles from '@theme/GlobalStyles';

export default {
  title: 'Common/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    docs: {
      description: {
        component: 'PrimaryButton 컴포넌트',
      },
    },
  },
} as ComponentMeta<typeof PrimaryButton>;
const Template: ComponentStory<typeof PrimaryButton> = args => <PrimaryButton {...args} />;
export const DefaultPrimaryButton = Template.bind({});
DefaultPrimaryButton.args = {
  // buttonColor: 'gray',
  text: '완료',
};

export const DefaultPrimaryButtonBlack = Template.bind({});
DefaultPrimaryButtonBlack.args = {
  // buttonColor: 'black',
  text: '확인',
};
