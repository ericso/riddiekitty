import axios from 'axios';

export const sendToSlack = (token: string, text: string, channel: string, rest?: any) => {
  axios.post(
    'https://slack.com/api/chat.postMessage',
    {
      token,
      text,
      channel,
      ...rest,
    },
  );
};