import { RedisDatabase } from './database';
import Axios from 'axios';
import { Paginate, PictureInfo, Result } from './types';

const defaultConfig = {
  httpClient: Axios.create({
    baseURL: 'http://localhost:4500',
  }),
};

export class DeviceDriver {

  constructor(
    private cacheDatabase: RedisDatabase = new RedisDatabase(),
    private config = defaultConfig) {
  }

  async getDevicePictures(
    deviceId: string,
    paginate: Paginate = {recordsPerPage: 50, offset: 0}
  ): Promise<Result<PictureInfo>> {
    const pictures: PictureInfo[] = await this.cacheDatabase.findPicturesByDeviceId(deviceId, paginate);

    if (pictures != null && pictures.length > 0) {
      console.log('There are pictures in cache');
      return {
        data: pictures,
        totalElements: pictures.length
      }
    }

    return await this.config.httpClient
      .get(`/api/device/${deviceId}/pictures`, {
        params: {
          ...paginate,
        },
      })
      .then(async (response) => {
        console.log('Pictures requested to service');
        await this.cacheDatabase.setPictures(deviceId, response.data);
        return {
          data: response.data,
          totalElements: response.data.length
        };
      });
  }

  release(): void {
    this.cacheDatabase.closeConnection();
  }

}