import { DeviceDriver } from './driver';
import { RedisDatabase } from './database';

const cacheDb = new RedisDatabase();
const deviceDriver = new DeviceDriver();


describe('driver test', () => {
  afterEach(async () => {
    await cacheDb.deletePictures('123');
  });

  afterAll(() => {
    cacheDb.closeConnection();
    deviceDriver.release();
  });

  test('Should request picture info to service', async () => {
    const pictures = await deviceDriver.getDevicePictures('123');
    expect(pictures.totalElements).toBe(2);
  });

  test('Should get picture info from cache', async () => {
    await cacheDb.setPictures('123', [
      {
        id: '123',
        address: '123',
        dateTime: 123445
      },
    ]).then(async () => {
      const pictures = await deviceDriver.getDevicePictures('123');
      expect(pictures.totalElements).toBe(1);
    });
  });
});