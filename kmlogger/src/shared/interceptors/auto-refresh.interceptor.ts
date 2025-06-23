import type { Presentation, UserRefreshTokenResponse } from "../../client/src";
import { apiClient } from "../services/apiService";

/**
 * Service for automatic token refresh with smart interception
 */
class AutoRefreshService {
  private static instance: AutoRefreshService;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  private constructor() {
    this.setupInterceptor();
  }

  public static getInstance(): AutoRefreshService {
    if (!AutoRefreshService.instance) {
      AutoRefreshService.instance = new AutoRefreshService();
    }
    return AutoRefreshService.instance;
  }

  /**
   * Sets up intelligent interceptor on existing apiClient methods
   */
  private setupInterceptor(): void {
    const originalCallAuthenticated = apiClient.callAuthenticated.bind(apiClient);
    const originalCallAuthenticatedComplete = apiClient.callAuthenticatedComplete.bind(apiClient);

    apiClient.callAuthenticated = async <T>(apiCall: any, options: any = {}) => {
      return this.interceptAuthenticatedCall(() => originalCallAuthenticated<T>(apiCall, options));
    };

    apiClient.callAuthenticatedComplete = async <T>(apiCall: any, options: any = {}) => {
      return this.interceptAuthenticatedCall(() => originalCallAuthenticatedComplete<T>(apiCall, options));
    };
  }

  /**
   * Intercepts authenticated calls to handle token refresh
   */
  private async interceptAuthenticatedCall<T>(originalCall: () => Promise<T>): Promise<T> {
    // Check if token is expired before making the call
    if (this.isTokenExpired()) {
      const refreshed = await this.attemptRefresh();
      if (!refreshed) {
        throw new Error('Token refresh failed');
      }
    }

    try {
      const result = await originalCall();
      return result;
    } catch (error: any) {
      if (error?.statusCode === 401 && !this.isRefreshing) {
        const refreshed = await this.attemptRefresh();
        if (refreshed) {
          return originalCall();
        }
      }
      
      throw error;
    }
  }

  /**
   * Não gerencia estado da aplicação, apenas tokens
   */
  public async attemptRefresh(): Promise<boolean> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('authToken');
    
    if (!refreshToken || !accessToken) {
      this.handleRefreshFailure();
      return false;
    }

    this.isRefreshing = true;

    try {
      const response = await apiClient.callPublicComplete(
        (client: Presentation) => client.userRefreshToken({ 
          body: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          }
        }),
        {
          showMessages: false, 
          onSuccess: (response: UserRefreshTokenResponse) => {
            if (response.data?.token) {
              apiClient.saveAuthData(
                response.data.token,
                response.data.user || {},
                response.data.refreshToken
              );
            }
          },
        }
      );

      const success = !!response?.data?.token;
      
      if (success) {
        this.processFailedQueue(null);
      } else {
        this.handleRefreshFailure();
      }
      
      return success;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.handleRefreshFailure();
      return false;
    } finally {
      this.isRefreshing = false;
      this.failedQueue = [];
    }
  }

  /**
   * Processes queued requests after successful token refresh
   */
  private processFailedQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });
  }

  private handleRefreshFailure(): void {
    this.processFailedQueue(new Error('Token refresh failed'));
    apiClient.removeAuthentication();
    
    if (!window.location.pathname.includes('/auth/login')) {
      window.location.href = '/auth/login';
    }
  }

  /**
   * Checks if current token is expired or about to expire
   */
  public isTokenExpired(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < (currentTime + 300);
    } catch {
      return true;
    }
  }

  /**
   */
  public startPeriodicCheck(): void {
    setInterval(async () => {
      if (apiClient.isAuthenticated() && this.isTokenExpired()) {
        console.log('🔄 Token expired, attempting refresh...');
        const refreshed = await this.attemptRefresh();
        if (!refreshed) {
          console.log('❌ Periodic refresh failed');
        }
      }
    }, 5 * 60 * 1000); 
  }

  /**
   * Manually ensures token is valid
   */
  public async ensureValidToken(): Promise<boolean> {
    if (this.isTokenExpired()) {
      return await this.attemptRefresh();
    }
    return true;
  }
}

export const autoRefresh = AutoRefreshService.getInstance();