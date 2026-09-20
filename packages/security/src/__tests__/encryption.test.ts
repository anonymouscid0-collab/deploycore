import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.ENCRYPTION_KEY = 'a'.repeat(64);

import { encrypt, decrypt } from '../encryption';

test('encrypt should return encrypted data', () => {
  const encrypted = encrypt('hello DeployCore');

  assert.notEqual(encrypted, 'hello DeployCore');
  assert.equal(encrypted.split(':').length, 3);
});

test('decrypt should recover the original plaintext', () => {
  const plaintext = 'hello DeployCore';
  const encrypted = encrypt(plaintext);

  assert.equal(decrypt(encrypted), plaintext);
});

test('encrypt should produce different ciphertexts for the same plaintext', () => {
  const encryptedA = encrypt('same text');
  const encryptedB = encrypt('same text');

  assert.notEqual(encryptedA, encryptedB);
});

test('decrypt should reject invalid encrypted data', () => {
  assert.throws(() => decrypt('invalid-data'), /Invalid encrypted data format/);
});

test('decrypt should reject tampered ciphertext', () => {
  const encrypted = encrypt('secret data');
  const parts = encrypted.split(':');

  parts[2] = '00' + parts[2].slice(2);

  assert.throws(() => decrypt(parts.join(':')), /Decryption failed/);
});
