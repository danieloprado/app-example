import { APIENDPOINT, IS_DEV } from '@/envs';
import useAuthStore from '@/stores/auth';
import useNotificationStore from '@/stores/notification';

import { ApiClient } from './client';

const client = new ApiClient(APIENDPOINT, useAuthStore.getState, useNotificationStore.getState);

export async function get<T = any>(url: string, params?: any): Promise<T> {
  return client.request<T>({ method: 'GET', url, data: params });
}

export async function post<T = any>(url: string, body?: any): Promise<T> {
  return client.request<T>({ method: 'POST', url, data: body });
}

export async function put<T = any>(url: string, body?: any): Promise<T> {
  return client.request<T>({ method: 'PUT', url, data: body });
}

export async function del<T = any>(url: string, params?: any): Promise<T> {
  return client.request<T>({ method: 'DELETE', url, data: params });
}

export async function refreshSession() {
  return client.refreshSession();
}

export async function getAuthToken() {
  return client.getAuthToken();
}

export async function upload<T = any>(
  url: string,
  data: FormData,
  onProgress?: (progress: number) => void
): Promise<T> {
  return client.request<T>({ method: 'POST', url, data, onProgress });
}
export async function devSleep(timer = 3000) {
  if (!IS_DEV) return;

  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
}
