import { createHash, randomBytes } from 'node:crypto';
import { getSecurityConfig } from './config';

export function generateToken(length?: number): string {
  const { defaultTokenLength } = getSecurityConfig();
  const bytes = length ?? defaultTokenLength;

  if (!Number.isFinite(bytes) || bytes < 16) {
    throw new Error('Token length must be a number >= 16 bytes');
  }

  return randomBytes(bytes).toString('hex');
}

export function hashToken(token: string): string {
  if (!token || typeof token !== 'string') {
    throw new Error('Token must be a non-empty string');
  }

  return createHash('sha256').update(token).digest('hex');
}

export interface GeneratedToken {
  plain: string;
  hash: string;
  expiresAt: Date;
}

export function generateVerificationToken(): GeneratedToken {
  const { emailVerificationTTL } = getSecurityConfig();
  const plain = generateToken();

  return {
    plain,
    hash: hashToken(plain),
    expiresAt: new Date(Date.now() + emailVerificationTTL),
  };
}

export function generateResetToken(): GeneratedToken {
  const { passwordResetTTL } = getSecurityConfig();
  const plain = generateToken();

  return {
    plain,
    hash: hashToken(plain),
    expiresAt: new Date(Date.now() + passwordResetTTL),
  };
}
