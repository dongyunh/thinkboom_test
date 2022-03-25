import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
export default {
  title: 'Common_temp/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button 컴포넌트',
      },
    },
  },
  argTypes: {
    text: {
      description: '텍스트',
      control: { type: 'text' },
    },
    onClick: {
      description: '클릭액션',
      control: { type: 'action' },
    },
  },
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;
export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: '입장하기',
};
export const DefaultButton1 = Template.bind({});
DefaultButton1.args = {
  text: '테스트',
};
