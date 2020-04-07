import express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import cors from 'cors';
import config from './config';

const { ipAllowOrigin, timeExpireHelmet } = config;

export function createExpressServer(router: express.Router): express.Express {
  const app: express.Express = express();

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(
    helmet.hsts({
      maxAge: timeExpireHelmet,
      includeSubDomains: true,
      force: true,
    })
  );
  app.disable('x-powered-by');
  app.use(cors());
  app.use((_req: express.Request, res: express.Response, next) => {
    res.set('Access-Control-Allow-Origin', ipAllowOrigin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    );
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(router);

  return app;
}
