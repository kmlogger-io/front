export interface Notification {
  key: string;
  message: string;
}

export interface BaseResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  notifications?: Notification[];
}

export interface ApiError {
  statusCode: number;
  message: string;
  notifications?: Notification[];
}