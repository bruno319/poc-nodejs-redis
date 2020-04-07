import { createExpressServer, createExpressRouter } from './src/config/';
import config from './src/config/config';

const { port } = config;

createExpressServer(createExpressRouter())
  .listen(port)
  .once('listening', () =>
    console.log(`Express server listening on port ${port}!`)
  );