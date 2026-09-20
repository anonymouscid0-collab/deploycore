import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.ENCRYPTION_KEY = 'a'.repeat(64);

import {
  generateToken,
  hashToken,
  generateVerificationToken,
  generateResetToken,
} from '../tokens';

test('generateToken should generate a hexadecimal token', () => {
  const token = generateToken();

  assert.equal(token.length, 64);
  assert.match(token, /^[0-9a-f]+$/);
});

test('generateToken should generate unique tokens', () => {
  const tokenA = generateToken();
  const tokenB = generateToken();

  assert.notEqual(tokenA, tokenB);
});

test('generateToken should reject lengths below 16 bytes', () => {
  assert.throws(() => generateToken(15), /number >= 16 bytes/);
});

test('hashToken should return a SHA-256 hash', () => {
  const token = 'test-token';
  const hash = hashToken(token);

  assert.equal(hash.length, 64);
  assert.match(hash, /^[0-9a-f]+$/);
});

test('hashToken should be deterministic', () => {
  const token = 'test-token';

  assert.equal(hashToken(token), hashToken(token));
});

test('generateVerificationToken should return token and expiration', () => {
  const result = generateVerificationToken();

  assert.ok(result.plain);
  assert.equal(result.hash, hashToken(result.plain));
  assert.ok(result.expiresAt instanceof Date);
  assert.ok(result.expiresAt.getTime() > Date.now());
});

test('generateResetToken should return token and expiration', () => {
  const result = generateResetToken();

  assert.ok(result.plain);
  assert.equal(result.hash, hashToken(result.plain));
  assert.ok(result.expiresAt instanceof Date);
  assert.ok(result.expiresAt.getTime() > Date.now());
});
