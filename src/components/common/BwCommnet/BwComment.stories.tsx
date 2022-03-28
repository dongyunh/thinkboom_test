import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BwComment } from './BwComment';
// import GlobalStyles from '@theme/GlobalStyles';

export default {
  title: 'Common/BwComment',
  component: BwComment,
  parameters: {
    docs: {
      description: {
        component: 'BwComment 컴포넌트',
      },
    },
  },
  argTypes: {
    width: {
      description: '너비',
      control: { type: 'number' },
    },
    height: {
      description: '높이',
      control: { type: 'number' },
    },
    subject: {
      description: '주제',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof BwComment>;
const Template: ComponentStory<typeof BwComment> = args => <BwComment {...args} />;
export const DefaultCard = Template.bind({});
DefaultCard.args = {
  width: 510,
  height: 515,
  subject: '오늘의 저녁메뉴 양양',
};
