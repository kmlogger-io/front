import { left, right, type Either } from "fp-ts/lib/Either";
import type { ApiError, BaseResponse } from "../types/api-types.types";

export const toEither = async <T>(apiCall: Promise<T>): Promise<Either<ApiError, BaseResponse<T>>> => {
  try {
    const response = await apiCall as BaseResponse<T>;
    
    if (response.statusCode >= 400) {
      return left({
        statusCode: response.statusCode,
        message: response.message,
        notifications: response.notifications
      });
    }
    
    return right(response);
  } catch (error: any) {
    return left({
      statusCode: 0,
      message: 'Erro de conexão',
      notifications: undefined
    });
  }
};