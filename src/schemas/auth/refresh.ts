import * as yup from 'yup';

import { AuthLoginResponse } from './login';

export interface AuthRefreshRequest {
  refreshToken: string;
  notificationToken?: string | null | undefined;
}

export interface AuthRefreshResponse extends Omit<AuthLoginResponse, 'refreshToken'> {}

export const authRefreshSchema: yup.Schema<AuthRefreshRequest> = yup.object({
  refreshToken: yup.string().required(),
  notificationToken: yup.string().optional().nullable()
});
