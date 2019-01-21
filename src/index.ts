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

  if (req.body.type === 'url_verification') {
    res.send({ challenge: req.body.challenge });
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
