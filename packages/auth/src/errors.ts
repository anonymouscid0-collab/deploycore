/**
 * Base authentication error class.
 * All auth-related errors should extend this class.
 */
export class AuthError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }
}

export class SessionExpiredError extends AuthError {
  constructor() {
    super('Session expired', 401, 'SESSION_EXPIRED');
  }
}

export class InvalidTokenError extends AuthError {
  constructor() {
    super('Invalid or expired token', 400, 'INVALID_TOKEN');
  }
}

export class EmailAlreadyExistsError extends AuthError {
  constructor() {
    super('Registration failed', 409, 'EMAIL_ALREADY_EXISTS');
  }
}

export class WeakPasswordError extends AuthError {
  constructor(reasons: string[]) {
    super(`Password too weak: ${reasons.join(', ')}`, 400, 'WEAK_PASSWORD');
  }
}
