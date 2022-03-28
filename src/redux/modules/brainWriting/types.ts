
export type ChatData = {
  nickname: string | null;
  message: string | null;
};
export type ChatHistoryType = ChatData[];

export type User = {
  nickname: string;
};

export type BrainWritingState = {
    currentPage: number;
    nickname: string | null;
    isAdmin: boolean;
    senderId: number | null,
    chatHistory?: ChatHistoryType;
  };