import bcrypt from 'bcryptjs';
import { getSecurityConfig } from './config';

export async function hashPassword(plain: string): Promise<string> {
  if (!plain || typeof plain !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  const { bcryptCostFactor } = getSecurityConfig();
  return bcrypt.hash(plain, bcryptCostFactor);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  if (!plain || !hash) return false;

  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

export interface PasswordStrengthResult {
  valid: boolean;
  errors: string[];
}

export function isPasswordStrong(password: string): PasswordStrengthResult {
  const errors: string[] = [];

  if (typeof password !== 'string' || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  return { valid: errors.length === 0, errors };
}
