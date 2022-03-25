import axios from 'axios';

type ResponseType = {
  data: {
    rwId: string;
    wordList: string[];
  };
};

export const postPickedWords = async (pickedWordList: string[]) => {
  const response: ResponseType = await axios.post('http://52.78.192.124/randomWord', {
    wordList: pickedWordList,
  });

  return response.data.rwId;
};
