import { createClient, RedisClient } from 'redis';
import { Paginate, PictureInfo } from './types';
import { promisify } from 'util';

export interface DatabaseConfiguration {
  host: string;
  port: number;
  password?: string;
  db?: string | number;
}

const configurationLocal: DatabaseConfiguration = {
  host: '127.0.0.1',
  port: 6379,
};

export class RedisDatabase {
  private client: RedisClient;

  public constructor(configuration: DatabaseConfiguration = configurationLocal) {
    this.client = createClient({...configurationLocal});
  }

  findPicturesByDeviceId = async (deviceId: string, paginate: Paginate): Promise<PictureInfo[]> => {
    const pictureInfoString = await promisify(this.client.lrange)
      .bind(this.client)(deviceId, paginate.offset, paginate.offset + paginate.recordsPerPage);
    return pictureInfoString.map(p => JSON.parse(p));
  };

  setPictures = async (deviceId: string, pictures: PictureInfo[]): Promise<void> => {
    const picturesString = pictures.map(p => JSON.stringify(p));
    await promisify(this.client.rpush)
      .bind(this.client)(deviceId, ...picturesString);
  };

  deletePictures = async (deviceId: string): Promise<void> => {
    await promisify(this.client.del)
      .bind(this.client)(deviceId);
  };

  closeConnection = (): void => {
    this.client.end(false);
  }
}