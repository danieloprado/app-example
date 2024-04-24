import * as yup from 'yup';

export interface AuthRefreshRequest {
  refreshToken: string;
  notificationToken?: string | null | undefined;
}

export interface AuthRefreshResponse {
  accessToken: string;
}

export const authRefreshSchema: yup.Schema<AuthRefreshRequest> = yup.object({
  refreshToken: yup.string().required(),
  notificationToken: yup.string().optional().nullable()
});
