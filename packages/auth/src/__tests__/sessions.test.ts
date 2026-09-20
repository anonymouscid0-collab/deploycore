import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createSessionToken, hashSessionToken, validateSessionFormat } from '../index';

process.env.ENCRYPTION_KEY = 'a'.repeat(64);

describe('sessions', () => {
  describe('createSessionToken', () => {
    it('creates a token of exactly 64 characters', () => {
      const token = createSessionToken();
      assert.equal(token.length, 64);
    });

    it('creates a token with only hexadecimal characters', () => {
      const token = createSessionToken();
      assert.match(token, /^[0-9a-fA-F]{64}$/);
    });

    it('creates unique tokens on each call', () => {
      const token1 = createSessionToken();
      const token2 = createSessionToken();
      assert.notEqual(token1, token2);
    });
  });

  describe('hashSessionToken', () => {
    it('hashes a token to a 64-character hex string', () => {
      const token = createSessionToken();
      const hash = hashSessionToken(token);
      assert.equal(hash.length, 64);
      assert.match(hash, /^[0-9a-f]{64}$/);
    });

    it('produces the same hash for the same token', () => {
      const token = createSessionToken();
      const hash1 = hashSessionToken(token);
      const hash2 = hashSessionToken(token);
      assert.equal(hash1, hash2);
    });

    it('produces different hashes for different tokens', () => {
      const token1 = createSessionToken();
      const token2 = createSessionToken();
      const hash1 = hashSessionToken(token1);
      const hash2 = hashSessionToken(token2);
      assert.notEqual(hash1, hash2);
    });
  });

  describe('validateSessionFormat', () => {
    it('returns true for a valid 64-character hex token', () => {
      const token = createSessionToken();
      assert.equal(validateSessionFormat(token), true);
    });

    it('returns true for uppercase hex characters', () => {
      const token = 'A'.repeat(64);
      assert.equal(validateSessionFormat(token), true);
    });

    it('returns false for a token shorter than 64 characters', () => {
      assert.equal(validateSessionFormat('a'.repeat(63)), false);
    });

    it('returns false for a token longer than 64 characters', () => {
      assert.equal(validateSessionFormat('a'.repeat(65)), false);
    });

    it('returns false for non-hexadecimal characters', () => {
      assert.equal(validateSessionFormat('g'.repeat(64)), false);
    });

    it('returns false for null', () => {
      assert.equal(validateSessionFormat(null), false);
    });

    it('returns false for undefined', () => {
      assert.equal(validateSessionFormat(undefined), false);
    });

    it('returns false for a number', () => {
      assert.equal(validateSessionFormat(123), false);
    });

    it('returns false for an object', () => {
      assert.equal(validateSessionFormat({}), false);
    });

    it('returns false for an empty string', () => {
      assert.equal(validateSessionFormat(''), false);
    });
  });
});
