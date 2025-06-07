// hooks/useApi.hook.ts
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { useSnackbar } from './useSnackbar.hook';
import type { ApiError, BaseResponse } from '../types/api-types.types';
import { toEither } from '../functions/api-error.handler';

interface ApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showMessages?: boolean;
}

export const useApi = () => {
  const { showSuccess, showError } = useSnackbar();

  const call = async <T>(
    apiCall: Promise<T>,
    options: ApiOptions<T> = { showMessages: true }
  ) => {
    const result = await toEither(apiCall);

    return pipe(
      result,
      E.fold(
        (error: ApiError) => {
          if (options.showMessages) {
            if (error.notifications?.length) {
              error.notifications.forEach((notif, index) => {
                setTimeout(() => showError(notif.message), index * 500);
              });
            } else {
              showError(error.message);
            }
          }
          options.onError?.(error);
          return null;
        },
        (response: BaseResponse<T>) => {
          if (options.showMessages && response.message) {
            showSuccess(response.message);
          }
          options.onSuccess?.(response.data!);
          return response.data;
        }
      )
    );
  };

  return { call };
};