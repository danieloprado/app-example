import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { IS_DEV } from '@/envs';
import { decodeToken } from '@/modules/Shared/utils/jwt';
import useAuthStore from '@/stores/auth';
import useNotificationStore from '@/stores/notification';

import { _apiMock } from './_mock';
import ApiError from './error';
import { formatApiResponse } from './formatter';
import { AuthRefreshRequest, AuthRefreshResponse } from '../schemas/refresh';

interface ApiClientRequestOptions {
  method: Method;
  url: string;
  data: any;
  onProgress?: (progress: number) => void;
  skipToken?: boolean;
}

export class ApiClient {
  private refreshTokenInProgress: Promise<string> | null = null;

  constructor(private readonly endpoint: string) {}

  public async request<T = any>({ method, url, data, onProgress, skipToken }: ApiClientRequestOptions): Promise<T> {
    try {
      if (IS_DEV && !this.endpoint) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(_apiMock[url]?.(data));
          }, 1000);
        });
      }

      onProgress && onProgress(0);
      const config: AxiosRequestConfig = {
        baseURL: url.startsWith('http') ? undefined : this.endpoint,
        url,
        method,
        headers: await this.getHeaders(data, skipToken),
        params: method === 'GET' ? data : undefined,
        data: method === 'POST' || method === 'PUT' ? data : undefined,
        onUploadProgress: progress => {
          onProgress && onProgress((progress.loaded / (progress.total ?? 0)) * 100);
        }
      };

      const response = await axios.request(config);
      onProgress && onProgress(100);

      return formatApiResponse<T>(response?.data);
    } catch (err: any) {
      return this.handleError(err);
    }
  }

  public refreshSession() {
    if (!this.refreshTokenInProgress) {
      const requestRefresh = async (retry: number = 0): Promise<AuthRefreshResponse> => {
        try {
          return this.request({
            method: 'POST',
            url: '/auth/refresh',
            data: {
              refreshToken: useAuthStore.getState().refreshToken,
              notificationToken: useNotificationStore.getState().token
            } as AuthRefreshRequest,
            skipToken: true
          });
        } catch (err: any) {
          const axiosError: AxiosError = err;
          if (!axiosError.isAxiosError) throw err;

          const status = axiosError?.status ?? -1;
          if (status !== 502 && status !== -1) throw err;

          if (retry >= 3) throw err;
          return requestRefresh(++retry);
        }
      };

      this.refreshTokenInProgress = requestRefresh()
        .then(({ accessToken }) => {
          useAuthStore.getState().setAccessToken(accessToken);
          return accessToken;
        })
        .finally(() => {
          this.refreshTokenInProgress = null;
        });
    }

    return this.refreshTokenInProgress;
  }

  public getAuthToken() {
    const { accessToken, refreshToken } = useAuthStore.getState();
    const validAccess = this.verifyTokenExp(accessToken);

    if (validAccess) return validAccess;
    if (!refreshToken) return null;

    return this.refreshSession();
  }

  private handleError(err: AxiosError): never {
    if (!err?.isAxiosError) {
      throw err;
    }

    const { accessToken, refreshToken, clear } = useAuthStore.getState();

    if (err.response?.status === 401 && (accessToken || refreshToken)) {
      clear();
    }

    throw new ApiError(err.config, err.response, err);
  }

  private async getHeaders(data?: any, skipToken?: boolean) {
    const headers: Record<string, string> = {
      'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
    };

    if (skipToken) {
      return headers;
    }

    const authToken = await this.getAuthToken();

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return headers;
  }

  private verifyTokenExp(token: string | undefined | null): string | undefined {
    try {
      if (!token) return undefined;

      const exp = decodeToken(token).exp;
      if (!exp) return token;

      const isExpired = exp < Date.now() / 1000;

      if (isExpired) return undefined;

      return token;
    } catch (err) {
      return undefined;
    }
  }
}
