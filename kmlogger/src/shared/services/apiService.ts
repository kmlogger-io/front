import * as coreAuth from '@azure/core-auth';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import type { AccessToken, TokenCredential } from '@azure/core-auth';
import type { ApiError, BaseResponse } from '../types/api-types.types';
import { Presentation } from '../../client/src';
import { toEither } from '../functions/api-error.handler';
import type { UserInfo } from '../types/auth.types';

/**
 * Bearer token credential implementation for authenticated API calls
 */
class BearerTokenCredential implements TokenCredential {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getToken(): Promise<AccessToken> {
    return {
      token: this.token,
      expiresOnTimestamp: Date.now() + (60 * 60 * 1000), // 1 hour
    };
  }
}

/**
 * Empty token credential for public API calls
 */
class EmptyTokenCredential implements coreAuth.TokenCredential {
  async getToken(): Promise<AccessToken> {
    return {
      token: '', 
      expiresOnTimestamp: Date.now() + (60 * 60 * 1000),
    };
  }
}

/**
 * Options for API calls that extract data from BaseResponse
 */
interface ApiCallDataOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showMessages?: boolean;
  showSuccess?: (message: string) => void;
  showError?: (message: string) => void;
}

/**
 * Options for API calls that return complete BaseResponse
 */
interface ApiCallCompleteOptions<T> {
  onSuccess?: (response: T) => void;
  onError?: (error: ApiError) => void;
  showMessages?: boolean;
  showSuccess?: (message: string) => void;
  showError?: (message: string) => void;
}

/**
 * Singleton service for managing API calls with authentication
 * Provides methods for both data extraction and complete response handling
 */
class ApiClientService {
  private static instance: ApiClientService;
  private authenticatedClient: Presentation | null = null;
  private readonly publicClient: Presentation;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5071';
    const emptyCredential = new EmptyTokenCredential();
    this.publicClient = new Presentation(emptyCredential, this.baseUrl);
  }

  /**
   * Gets the singleton instance of ApiClientService
   */
  public static getInstance(): ApiClientService {
    if (!ApiClientService.instance) {
      ApiClientService.instance = new ApiClientService();
    }
    return ApiClientService.instance;
  }

  /**
   * Updates the authenticated client with current token from localStorage
   */
  private updateAuthenticatedClient(): void {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      const credential = new BearerTokenCredential(token);
      this.authenticatedClient = new Presentation(credential, this.baseUrl);
    } else {
      this.authenticatedClient = null;
    }
  }

  /**
   * Core method for API calls that extracts data from BaseResponse
   * @param apiCall Function that returns a Promise with API response
   * @param options Configuration options for the call
   * @returns Promise with extracted data of type T or null
   */
  public async callWithDataExtraction<T>(
    apiCall: () => Promise<any>,
    options: ApiCallDataOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    try {
      const result = await toEither(apiCall());
      if (!result) {
        return null;
      }
      
      return pipe(
        result,
        E.fold(
          (error: ApiError) => {
            this.handleError(error, options);
            return null;
          },
          (response: BaseResponse<T>) => {
            this.handleSuccess(response, options);
            const extractedData = response.data ?? null;
            return extractedData;
          }
        )
      );
    } catch {
      this.handleUnexpectedError(options);
      return null;
    }
  }

  /**
   * Core method for API calls that returns complete response
   * @param apiCall Function that returns a Promise with API response
   * @param options Configuration options for the call
   * @returns Promise with complete response or null
   */
  public async callWithCompleteResponse<T>(
    apiCall: () => Promise<any>,
    options: ApiCallCompleteOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    try {
      const result = await toEither(apiCall());
      if (!result) return null;
      
      return pipe(
        result,
        E.fold(
          (error: ApiError) => {
            this.handleError(error, options);
            return null;
          },
          (response: any) => {
            if (options.showMessages && response.message && options.showSuccess) {
              options.showSuccess(response.message);
            }
            
            options.onSuccess?.(response as T);
            return response as T;
          }
        )
      );
    } catch {
      this.handleUnexpectedError(options);
      return null;
    }
  }

  /**
   * Makes a public API call and extracts data from response
   * @param apiCall Function that makes the API call
   * @param options Configuration options
   * @returns Promise with extracted data or null
   */
  public async callPublic<T>(
    apiCall: (client: Presentation) => Promise<any>,
    options: ApiCallDataOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    return this.callWithDataExtraction(() => apiCall(this.publicClient), options);
  }

  /**
   * Makes a public API call and returns complete response
   * @param apiCall Function that makes the API call
   * @param options Configuration options
   * @returns Promise with complete response or null
   */
  public async callPublicComplete<T>(
    apiCall: (client: Presentation) => Promise<any>,
    options: ApiCallCompleteOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    return this.callWithCompleteResponse(() => apiCall(this.publicClient), options);
  }

  /**
   * Makes an authenticated API call and extracts data from response
   * @param apiCall Function that makes the API call
   * @param options Configuration options
   * @returns Promise with extracted data or null
   */
  public async callAuthenticated<T>(
    apiCall: (client: Presentation) => Promise<any>,
    options: ApiCallDataOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    if (!this.authenticatedClient) {
      if (options.showError) {
        options.showError('Usuário não autenticado');
      }
      return null;
    }
    return this.callWithDataExtraction(() => apiCall(this.authenticatedClient!), options);
  }

  /**
   * Makes an authenticated API call and returns complete response
   * @param apiCall Function that makes the API call
   * @param options Configuration options
   * @returns Promise with complete response or null
   */
  public async callAuthenticatedComplete<T>(
    apiCall: (client: Presentation) => Promise<any>,
    options: ApiCallCompleteOptions<T> = { showMessages: true }
  ): Promise<T | null> {
    if (!this.authenticatedClient) {
      if (options.showError) {
        options.showError('Usuário não autenticado');
      }
      return null;
    }
    return this.callWithCompleteResponse(() => apiCall(this.authenticatedClient!), options);
  }

  /**
   * Updates the authenticated client with current token
   */
  public updateClientWithToken(): void {
    this.updateAuthenticatedClient();
  }

  /**
   * Removes all authentication data and clears authenticated client
   */
  public removeAuthentication(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.authenticatedClient = null;
  }

  /**
   * Checks if the user is currently authenticated
   * @returns True if authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const hasClient = !!this.authenticatedClient;
    const result = !!token && hasClient;
    return result;
  }

  /**
   * Gets the current user data from localStorage
   * @returns User object or null if not found
   */
  public getCurrentUser(): UserInfo | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      return user as UserInfo;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Saves authentication data to localStorage and updates client
   * @param token Access token
   * @param user User information
   * @param refreshToken Optional refresh token
   */
  public saveAuthData(token: string, user: UserInfo | unknown, refreshToken?: string): void {
    if (!token) {
      throw new Error('Token is required for authentication');
    }
    
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      this.updateClientWithToken();
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  }

  private handleError(error: ApiError, options: ApiCallDataOptions<any> | ApiCallCompleteOptions<any>): void {
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
  }

  private handleSuccess<T>(response: BaseResponse<T>, options: ApiCallDataOptions<T>): void {
    if (options.showMessages && response.message && options.showSuccess) {
      options.showSuccess(response.message);
    }
    options.onSuccess?.(response.data!);
  }

  private handleUnexpectedError(options: ApiCallDataOptions<any> | ApiCallCompleteOptions<any>): void {
    if (options.showError) {  
      options.showError('Erro inesperado na chamada da API');
    }
  }
}

export const apiClient = ApiClientService.getInstance();