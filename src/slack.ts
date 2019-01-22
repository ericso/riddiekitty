import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://slack.com/api/',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
  },
});

export const sendToSlack = (token: string, text: string, channel: string, rest?: any) => {
  axiosClient.post(
    'chat.postMessage',
    {
      token,
      text,
      channel,
      ...rest,
    },
  );
};