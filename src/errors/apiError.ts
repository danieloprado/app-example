import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import AppError from './appError';

interface IApiErrorMeta {
  request: {
    baseURL?: string;
    url?: string;
    method?: string;
    params: any;
    data: any;
    headers: any;
  };
  response?: {
    status: number;
    data?: any;
  };
  err: any;
}

export default class ApiError extends AppError<IApiErrorMeta> {
  public isApiError = true;
  public readonly status: number;
  public readonly data: any;
  public readonly tags: Record<string, string>;

  constructor(request: AxiosRequestConfig | undefined, axiosResponse: AxiosResponse | undefined, err: AxiosError) {
    const response = { status: axiosResponse?.status ?? -1, data: axiosResponse?.data ?? null };

    delete err.request;
    delete err.response;
    delete err.config;

    const ignoreLog =
      (response.status < 500 && response.status > 0 && !response.data?.validationError) || err.code === 'ERR_NETWORK';

    super(
      'api-error',
      {
        request: {
          baseURL: request?.baseURL,
          url: request?.url,
          method: request?.method,
          params: request?.params,
          data: request?.data,
          headers: request?.headers
        },
        response,
        err
      },
      ignoreLog
    );

    this.status = response.status;
    this.data = response.data;
    this.tags = {
      'app-error': 'api-error',
      'url': request?.url ?? 'unknown',
      'status': response.status?.toString() ?? 'unknown'
    };
  }
}
