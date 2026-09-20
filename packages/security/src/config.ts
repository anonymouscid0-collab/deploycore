/**
 * Centralized security configuration.
 * All sensitive values are read from environment variables.
 * No secrets are hardcoded.
 */

export interface SecurityConfig {
  /** AES-256-GCM encryption key (32 bytes, hex-encoded = 64 chars) */
  encryptionKey: Buffer;
  /** Bcrypt cost factor (12 = recommended for production) */
  bcryptCostFactor: number;
  /** Default token length in bytes (32 bytes = 64 hex chars) */
  defaultTokenLength: number;
  /** Email verification token expiration (ms) */
  emailVerificationTTL: number;
  /** Password reset token expiration (ms) */
  passwordResetTTL: number;
}

const MIN_ENCRYPTION_KEY_LENGTH = 32;
const DEFAULT_BCRYPT_COST = 12;
const DEFAULT_TOKEN_LENGTH = 32;
const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

export function loadSecurityConfig(): SecurityConfig {
  const rawKey = process.env.ENCRYPTION_KEY;

  if (!rawKey) {
    throw new Error(
      'ENCRYPTION_KEY environment variable is required. ' +
        'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }

  const encryptionKey = Buffer.from(rawKey, 'hex');

  if (encryptionKey.length < MIN_ENCRYPTION_KEY_LENGTH) {
    throw new Error(
      `ENCRYPTION_KEY must be at least ${MIN_ENCRYPTION_KEY_LENGTH} bytes (64 hex chars). ` +
        `Got ${encryptionKey.length} bytes.`
    );
  }

  const bcryptCostFactor = Number.parseInt(
    process.env.BCRYPT_COST_FACTOR ?? '',
    10
  );

  return {
    encryptionKey,
    bcryptCostFactor: Number.isFinite(bcryptCostFactor)
      ? bcryptCostFactor
      : DEFAULT_BCRYPT_COST,
    defaultTokenLength: DEFAULT_TOKEN_LENGTH,
    emailVerificationTTL: FIFTEEN_MINUTES,
    passwordResetTTL: ONE_HOUR,
  };
}

let _config: SecurityConfig | null = null;

export function getSecurityConfig(): SecurityConfig {
  if (!_config) {
    _config = loadSecurityConfig();
  }
  return _config;
}

export function _resetSecurityConfig(): void {
  _config = null;
}