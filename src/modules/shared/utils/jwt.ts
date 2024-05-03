import { decode as base64decode } from 'base-64';
import { decode as utf8decode } from 'utf8';

import { CurrentUser } from '../stores/auth';

export function decodeToken(token: string | null | undefined): any | null;
export function decodeToken(token: string | null | undefined): CurrentUser | null;
export function decodeToken(token: string | null | undefined): any | null {
  if (!token) return null;

  const payload = token?.split('.')?.[1];
  if (!payload) return null;

  try {
    return JSON.parse(utf8decode(base64decode(payload)));
  } catch (err) {
    return null;
  }
}
