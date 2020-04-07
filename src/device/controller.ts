import { Request, Response } from 'express';

export interface PictureInfo {
  id: string;
  address: string;
  dateTime: number;
}

export interface DeviceController {
  findPictures(request: Request, response: Response): Promise<unknown>;
}

export class DeviceControllerHttp implements DeviceController {

  async findPictures(request: Request, response: Response): Promise<unknown> {
    const pictureInfo: PictureInfo[] = [
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

    return response.status(200).json(pictureInfo);
  }
}
