import { Router } from 'express';
import { DeviceController, DeviceControllerHttp } from './controller';

export function createDeviceRouter(
  controller: DeviceController = new DeviceControllerHttp()
): Router {
  return Router().get('/api/device/:deviceId/pictures', (request, response) =>
    controller.findPictures(request, response)
  );
}
