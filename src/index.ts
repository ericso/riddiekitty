import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import logger from './logger';

// exports for the library
export * from './lib';


const app = express();

// for parsing JSON requests
app.use(bodyParser.json());

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.post('/events', (req, res) => {
  logger.info(`POST /events: ${req}`);

  // TODO: delete
  logger.info(`SLACK_OAUTH_ACCESS_TOKEN: ${process.env.SLACK_OAUTH_ACCESS_TOKEN}`);
  logger.info(`SLACK_BOT_USER_OAUTH_ACCESS_TOKEN: ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`);

  res.sendStatus(200);

  const payload = req.body;

  // TODO: delete
  logger.info(`payload.type ${payload.type}`);

  if (payload.type === 'url_verification') {
    res.send({ challenge: payload.challenge });
  }

  // TODO: delete
  logger.info(`payload.event.type ${payload.event.type}`);

  if (payload.event.type === 'app_mention') {
    if (payload.event.text.includes('tell me a riddle')) {
        // Make call to chat.postMessage using bot's token
        logger.info(`asked to tell a riddle`)
    }
  }
});

let port;
process.argv.forEach((value, _) => {
  if (value.split('=')[0] === 'port') {
    port = value.split('=')[1];
  }
});
if (port === undefined) {
  port = config.PORT;
}


app.listen(port, '0.0.0.0', () => {
  logger.info(`🚀 Server ready at http://0.0.0.0:${port}`);
});
