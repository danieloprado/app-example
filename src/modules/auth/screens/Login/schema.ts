import * as yup from 'yup';

export interface AuthLoginRequest {
  email: string;
  password: string;
  app: boolean;
  deviceName?: string | null | undefined;
  notificationToken?: string | null | undefined;
}

export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authLoginSchema: yup.Schema<AuthLoginRequest> = yup.object({
  email: yup.string().required().email().lowercase(),
  password: yup.string().required(),
  app: yup.bool().default(false),
  deviceName: yup.string().optional().nullable(),
  notificationToken: yup.string().optional().nullable()
});
