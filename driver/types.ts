export interface PictureInfo {
  id: string;
  address: string;
  dateTime: number;
}

export interface Result<T> {
  totalElements: number;
  data: T[];
}

export interface Paginate {
  recordsPerPage: number;
  offset: number;
}