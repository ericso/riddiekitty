import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import logger from './logger';
import RiddleMaster from './lib/riddle/riddleMaster';


/** Riddles */
const riddleMaster = new RiddleMaster();


/** Routing */ 
const app = express();

// for parsing JSON requests
app.use(bodyParser.json());

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.post('/events', (req, res) => {
  // Slack requires an immediate response (3 seconds)
  res.sendStatus(200);

  const payload = req.body;
  const event = payload.event;

  logger.info(`POST /events: ${payload.type} | ${payload.event_id}`);

  // TODO: queue requests

  /**
    {
      "token": "XXYYZZ",
      "team_id": "TXXXXXXXX",
      "api_app_id": "AXXXXXXXXX",
      "event": {
        "type": "name_of_event",
        "event_ts": "1234567890.123456",
        "user": "UXXXXXXX1",
        ...
      },
      "type": "event_callback",
      "authed_users": [
        "UXXXXXXX1",
        "UXXXXXXX2"
      ],
      "event_id": "Ev08MFMKH6",
      "event_time": 1234567890
    }
  */

  // Slack's URL verification check
  if (payload.type === 'url_verification') {
    res.send({ challenge: payload.challenge });
  }

  // Ask a riddle flow
  if (event.type === 'app_mention') {
    logger.info(`user ${event.user}`);

    if (event.text.includes('tell me a riddle')) {
      const prompt = riddleMaster.getPromptFor(event.user);
      logger.info(`the prompt is ${prompt}`);
    } else if (event.text.includes('i give up')) {
      const answer = riddleMaster.getAnswerFor(event.user);
      logger.info(`the answer is ${answer}`);
    } else if (event.text.includes('give me a hint')) {
      const hint = riddleMaster.getHintFor(event.user);
      logger.info(`here's a hint: ${hint}`);
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
