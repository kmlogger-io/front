import * as coreAuth from '@azure/core-auth';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import type { AccessToken, TokenCredential } from '@azure/core-auth';
import type { ApiError, BaseResponse } from '../types/api-types.types';
import { Presentation } from '../../client/src';
import { toEither } from '../functions/api-error.handler';

class BearerTokenCredential implements TokenCredential {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getToken(): Promise<AccessToken> {
    return {
      token: this.token,
      expiresOnTimestamp: Date.now() + (60 * 60 * 1000), 
    };
  }
}

class EmptyTokenCredential implements coreAuth.TokenCredential {
  async getToken(): Promise<AccessToken> {
    return {
      token: '', 
      expiresOnTimestamp: Date.now() + (60 * 60 * 1000),
    };
  }
}

interface ApiCallOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showMessages?: boolean;
  showSuccess?: (message: string) => void;
  showError?: (message: string) => void;
}

// Classe singleton para gerenciar o cliente da API
class ApiClientService {
  private static instance: ApiClientService;
  private authenticatedClient: Presentation | null = null;
  private publicClient: Presentation;
  private baseUrl: string;

  private constructor() {
  this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5071';
  
  const emptyCredential = new EmptyTokenCredential();
  this.publicClient = new Presentation(emptyCredential, this.baseUrl);
}

  public static getInstance(): ApiClientService {
    if (!ApiClientService.instance) {
      ApiClientService.instance = new ApiClientService();
    }
    return ApiClientService.instance;
  }

    private updateAuthenticatedClient(): void {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      const credential = new BearerTokenCredential(token);
      this.authenticatedClient = new Presentation(credential, this.baseUrl);
    } else {
      this.authenticatedClient = null;
    }
  }

  public async call<T>(
    apiCall: () => Promise<T>,
    options: ApiCallOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    try {
      const result = await toEither(apiCall());
      console.log("result", result)
      console.log("url", this.baseUrl)
      if (!result) return null
      
      return pipe(
        result,
        E.fold(
          (error: ApiError) => {
            if (options.showMessages && options.showError) {
              if (error.notifications?.length) {
                error.notifications.forEach((notif, index) => {
                  setTimeout(() => options.showError!(notif.message), index * 500);
                });
              } else {
                options.showError(error.message);
              }
            }
            options.onError?.(error);
            return null;
          },
          (response: BaseResponse<T>) => {
            if (options.showMessages && response.message && options.showSuccess) {
              options.showSuccess(response.message);
            }
            options.onSuccess?.(response.data!);
            return response.data ?? null;
          }
        )
      );
    } catch {
      if (options.showError) {
        options.showError('Erro inesperado na chamada da API');
      }
      return null;
    }
  }

  public async callAuthenticated<T>(
    apiCall: (client: Presentation) => Promise<T>,
    options: ApiCallOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    if (!this.authenticatedClient) {
      if (options.showError) {
        options.showError('Usuário não autenticado');
      }
      return null;
    }
    
    return this.call(() => apiCall(this.authenticatedClient!), options);
  }

  public async callPublic<T>(
    apiCall: (client: Presentation) => Promise<T>,
    options: ApiCallOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    return this.call(() => apiCall(this.publicClient), options);
  }

  public updateClientWithToken(): void {
    this.updateAuthenticatedClient();
  }

  public removeAuthentication(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.authenticatedClient = null;
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken') && !!this.authenticatedClient;
  }

  public getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  public saveAuthData(token: string, user: any, refreshToken?: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    this.updateClientWithToken();
  }
}

export const apiClient = ApiClientService.getInstance();