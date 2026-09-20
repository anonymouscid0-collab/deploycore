import { generateToken, hashToken } from '@deploycore/security';

/**
 * Create a new session token.
 * Returns a cryptographically secure random token (64 hex characters).
 */
export function createSessionToken(): string {
  return generateToken();
}

/**
 * Hash a session token for secure storage in the database.
 * Returns a SHA-256 hash (64 hex characters).
 */
export function hashSessionToken(token: string): string {
  return hashToken(token);
}

/**
 * Validate that a session token has the correct format.
 * Must be exactly 64 hexadecimal characters.
 * Returns false for any invalid input (non-string, wrong length, non-hex chars).
 */
export function validateSessionFormat(token: unknown): boolean {
  if (typeof token !== 'string') {
    return false;
  }

  if (token.length !== 64) {
    return false;
  }

  return /^[0-9a-fA-F]{64}$/.test(token);
}
