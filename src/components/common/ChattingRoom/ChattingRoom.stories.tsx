// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import React from 'react';
// import { ChattingRoom } from './ChattingRoom';
// import { messageData } from '../../../mock/messageData';

// export default {
//   title: 'Common/ChattingRoom',
//   component: ChattingRoom,
//   parameters: {
//     docs: {
//       description: {
//         component: 'ChattingRoom 컴포넌트',
//       },
//     },
//   },
//   argTypes: {
//     text: {
//       description: '텍스트',
//       control: { type: 'text' },
//     },
//     onClick: {
//       description: '클릭액션',
//       control: { type: 'action' },
//     },
//   },
// } as ComponentMeta<typeof ChattingRoom>;
// const Template: ComponentStory<typeof ChattingRoom> = args => <ChattingRoom {...args} />;
// export const DefaultChattingRoom = Template.bind({});
// DefaultChattingRoom.args = {
//   chatHistory: messageData,
//   myNickname: '코끼리귀여워',
// };
