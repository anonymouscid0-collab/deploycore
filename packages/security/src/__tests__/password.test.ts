import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.ENCRYPTION_KEY = 'a'.repeat(64);

import {
  hashPassword,
  verifyPassword,
  isPasswordStrong,
} from '../password';

test('hashPassword should hash a password', async () => {
  const password = 'StrongPass123';
  const hash = await hashPassword(password);

  assert.notEqual(hash, password);
  assert.ok(hash.startsWith('$2'));
});

test('verifyPassword should accept the correct password', async () => {
  const password = 'StrongPass123';
  const hash = await hashPassword(password);

  assert.equal(await verifyPassword(password, hash), true);
});

test('verifyPassword should reject the wrong password', async () => {
  const hash = await hashPassword('StrongPass123');

  assert.equal(await verifyPassword('WrongPass123', hash), false);
});

test('verifyPassword should safely reject invalid input', async () => {
  assert.equal(await verifyPassword('', ''), false);
});

test('isPasswordStrong should accept a strong password', () => {
  const result = isPasswordStrong('StrongPass123');

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test('isPasswordStrong should reject a short password', () => {
  const result = isPasswordStrong('Ab1');

  assert.equal(result.valid, false);
  assert.ok(result.errors.length > 0);
});

test('isPasswordStrong should require uppercase letters', () => {
  const result = isPasswordStrong('strongpass123');

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('uppercase')));
});

test('isPasswordStrong should require lowercase letters', () => {
  const result = isPasswordStrong('STRONGPASS123');

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('lowercase')));
});

test('isPasswordStrong should require a digit', () => {
  const result = isPasswordStrong('StrongPassword');

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('digit')));
});
