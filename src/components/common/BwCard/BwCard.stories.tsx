import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BwCard } from './BwCard';
// import GlobalStyles from '@theme/GlobalStyles';

export default {
  title: 'Common/BwCard',
  component: BwCard,
  parameters: {
    docs: {
      description: {
        component: 'BwCard 컴포넌트',
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
} as ComponentMeta<typeof BwCard>;
const Template: ComponentStory<typeof BwCard> = args => <BwCard {...args} />;
export const DefaultCard = Template.bind({});
DefaultCard.args = {
  width: 375,
  height: 515,
  subject: '오늘의 저녁메뉴 양양',
};
