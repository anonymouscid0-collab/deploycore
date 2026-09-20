import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { timingSafeEqual } from '../compare';

describe('compare', () => {
  it('timingSafeEqual returns true for identical strings', () => {
    assert.equal(timingSafeEqual('abc123', 'abc123'), true);
  });

  it('timingSafeEqual returns false for different strings of same length', () => {
    assert.equal(timingSafeEqual('abc123', 'abc124'), false);
    assert.equal(timingSafeEqual('password', 'Password'), false);
  });

  it('timingSafeEqual returns false for strings of different lengths', () => {
    assert.equal(timingSafeEqual('abc', 'abcd'), false);
    assert.equal(timingSafeEqual('longer', 'short'), false);
  });

  it('timingSafeEqual returns false for invalid/non-string inputs', () => {
    // @ts-expect-error testing invalid input
    assert.equal(timingSafeEqual(null, 'abc'), false);
    // @ts-expect-error testing invalid input
    assert.equal(timingSafeEqual('abc', undefined), false);
    // @ts-expect-error testing invalid input
    assert.equal(timingSafeEqual(123, '123'), false);
    // @ts-expect-error testing invalid input
    assert.equal(timingSafeEqual({}, {}), false);
    // @ts-expect-error testing invalid input
    assert.equal(timingSafeEqual('abc', null), false);
  });
});
