import { RedisDatabase } from './database';

const redis = new RedisDatabase();

afterAll(() => redis.closeConnection());

test('Should fetch picture info', async () => {
  const pictureInfo = [
    {
      id: '123',
      address: '123',
      dateTime: 123445
    },
    {
      id: '123',
      address: '123',
      dateTime: 123445
    },
    {
      id: '123',
      address: '123',
      dateTime: 123445
    },
    {
      id: '123',
      address: '123',
      dateTime: 123445
    }
  ];
  await redis.setPictures('123', pictureInfo);
  const device = await redis.findPicturesByDeviceId('123', {offset: 0, recordsPerPage: 50});
  await redis.deletePictures('123');

  expect(device).toStrictEqual(pictureInfo);
});