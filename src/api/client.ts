import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import ApiError from '@/errors/apiError';
import type { AuthRefreshRequest, AuthRefreshResponse } from '@/schemas/auth/refresh';
import { decodeToken } from '@/utils/jwt';

import { formatApiResponse } from './formatter';

interface ApiClientRequestOptions {
  method: Method;
  url: string;
  data: any;
  onProgress?: (progress: number) => void;
  skipToken?: boolean;
}

export class ApiClient {
  private refreshTokenInProgress: Promise<string> | null = null;

  constructor(
    private readonly endpoint: string,
    private readonly store: () => {
      accessToken?: string;
      refreshToken?: string;
      setAccessToken(token: string): void;
      clear(): void;
    },
    private readonly notificationStore?: () => {
      token: string | null;
    }
  ) {}

  public async request<T = any>({ method, url, data, onProgress, skipToken }: ApiClientRequestOptions): Promise<T> {
    try {
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
    const { refreshToken } = this.store();

    if (!this.refreshTokenInProgress) {
      const requestRefresh = async (retry: number = 0): Promise<AuthRefreshResponse> => {
        try {
          return this.request({
            method: 'POST',
            url: '/auth/refresh',
            data: { refreshToken, notificationToken: this.notificationStore?.().token } as AuthRefreshRequest,
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
          this.store().setAccessToken(accessToken);
          return accessToken;
        })
        .finally(() => {
          this.refreshTokenInProgress = null;
        });
    }

    return this.refreshTokenInProgress;
  }

  public getAuthToken() {
    const { accessToken, refreshToken } = this.store();
    const validAccess = this.verifyTokenExp(accessToken);

    if (validAccess) return validAccess;
    if (!refreshToken) return null;

    return this.refreshSession();
  }

  private handleError(err: AxiosError): never {
    if (!err?.isAxiosError) {
      throw err;
    }

    const { accessToken, refreshToken, clear } = this.store();

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
      const isExpired = exp < Date.now() / 1000;

      if (isExpired) return undefined;

      return token;
    } catch (err) {
      return undefined;
    }
  }
}
