import { Router } from 'express';
import { createDeviceRouter } from '../device/router';

function createRouter(routers: Router[]): Router {
  return routers.reduce(
    (previous: Router, current: Router) => previous.use(current),
    Router()
  );
}

export function createExpressRouter(): Router {
  return Router()
    .use(createDeviceRouter());
}