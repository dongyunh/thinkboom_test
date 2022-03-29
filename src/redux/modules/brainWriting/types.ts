
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
    BWisAdmin: boolean;
    BWisSubmit: boolean;
    BWsubject?: string;
    senderId: number | null,
    idea: string | null,
    userId: number | null,
    bwRoomId: string | null,
    chatHistory?: ChatHistoryType;
  };