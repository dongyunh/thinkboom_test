import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Message } from './Message';
export default {
  title: 'Common/DevatingChatBox/Message',
  component: Message,
  parameters: {
    docs: {
      description: {
        component: 'Message 컴포넌트',
      },
    },
  },
  argTypes: {
    isMe: {
      description: '본인인지 아닌지 판단하는 값',
      control: { type: 'boolean' },
    },
    message: {
      description: '메시지',
      control: { type: 'text' },
    },
    hatName: {
      description: '모자이름',
      control: { type: 'text' },
    },
    hat: {
      description: '모자종류',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Message>;
const Template: ComponentStory<typeof Message> = args => <Message {...args} />;
export const DefaultOtherMessage = Template.bind({});
DefaultOtherMessage.args = {
  isMe: false,
  message:
    '피에 든 안고, 위하여 타오르고 옷을 꽃 위하여, 사막이다. 눈이 노년에게서 열매를 무엇을 보내는 끝까지 없는 아름다우냐? 갑 가슴이 이상의 몸이 보배를 장식하는 것이다. 이상의 않는 아니더면, 그들을 끝에 거친 아름다우냐?',
  hatName: '빨간모자',
  hat: 'red',
};

export const DefaultMyMessage = Template.bind({});
DefaultMyMessage.args = {
  isMe: true,
  message: '어 먹었다',
  hatName: '빨간모자',
  hat: 'red',
};
