import axios from 'axios';

type ResponseType = {
  data: {
    rwId: string;
    wordList: string[];
  };
};

export const postPickedWords = async (pickedWordList: string[], subject: string | null) => {
  console.log(subject);
  const response: ResponseType = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/randomWord`, {
    subject: subject,
    wordList: pickedWordList,
  });

  return response.data.rwId;
};
