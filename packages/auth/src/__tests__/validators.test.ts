import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  registerSchema,
  loginSchema,
  emailVerificationSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
} from "../index";

describe("validators", () => {
  describe("registerSchema", () => {
    it("accepts valid registration data", () => {
      const result = registerSchema.safeParse({
        email: "user@example.com",
        password: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
      });
      assert.equal(result.success, true);
    });

    it("rejects invalid email format", () => {
      const result = registerSchema.safeParse({
        email: "not-an-email",
        password: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
      });
      assert.equal(result.success, false);
    });

    it("rejects weak password", () => {
      const result = registerSchema.safeParse({
        email: "user@example.com",
        password: "weak",
        confirmPassword: "weak",
      });
      assert.equal(result.success, false);
    });

    it("rejects mismatched passwords", () => {
      const result = registerSchema.safeParse({
        email: "user@example.com",
        password: "MyStr0ngP@ss",
        confirmPassword: "DifferentP@ss1",
      });
      assert.equal(result.success, false);
    });

    it("rejects unknown fields with .strict()", () => {
      const result = registerSchema.safeParse({
        email: "user@example.com",
        password: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
        unknownField: "should be rejected",
      });
      assert.equal(result.success, false);
    });

    it("rejects missing email", () => {
      const result = registerSchema.safeParse({
        password: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
      });
      assert.equal(result.success, false);
    });
  });

  describe("loginSchema", () => {
    it("accepts valid login data", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "any-password",
      });
      assert.equal(result.success, true);
    });

    it("rejects invalid email format", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "any-password",
      });
      assert.equal(result.success, false);
    });

    it("rejects empty password", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "",
      });
      assert.equal(result.success, false);
    });

    it("rejects unknown fields with .strict()", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "any-password",
        unknownField: "should be rejected",
      });
      assert.equal(result.success, false);
    });

    it("does NOT validate password strength", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "weak",
      });
      assert.equal(result.success, true);
    });
  });

  describe("emailVerificationSchema", () => {
    it("accepts valid token", () => {
      const result = emailVerificationSchema.safeParse({
        token: "a".repeat(64),
      });
      assert.equal(result.success, true);
    });

    it("rejects empty token", () => {
      const result = emailVerificationSchema.safeParse({
        token: "",
      });
      assert.equal(result.success, false);
    });

    it("rejects unknown fields with .strict()", () => {
      const result = emailVerificationSchema.safeParse({
        token: "a".repeat(64),
        unknownField: "should be rejected",
      });
      assert.equal(result.success, false);
    });
  });

  describe("passwordResetRequestSchema", () => {
    it("accepts valid email", () => {
      const result = passwordResetRequestSchema.safeParse({
        email: "user@example.com",
      });
      assert.equal(result.success, true);
    });

    it("rejects invalid email format", () => {
      const result = passwordResetRequestSchema.safeParse({
        email: "not-an-email",
      });
      assert.equal(result.success, false);
    });

    it("rejects unknown fields with .strict()", () => {
      const result = passwordResetRequestSchema.safeParse({
        email: "user@example.com",
        unknownField: "should be rejected",
      });
      assert.equal(result.success, false);
    });
  });

  describe("passwordResetSchema", () => {
    it("accepts valid password reset data", () => {
      const result = passwordResetSchema.safeParse({
        token: "a".repeat(64),
        newPassword: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
      });
      assert.equal(result.success, true);
    });

    it("rejects empty token", () => {
      const result = passwordResetSchema.safeParse({
        token: "",
        newPassword: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
      });
      assert.equal(result.success, false);
    });

    it("rejects weak new password", () => {
      const result = passwordResetSchema.safeParse({
        token: "a".repeat(64),
        newPassword: "weak",
        confirmPassword: "weak",
      });
      assert.equal(result.success, false);
    });

    it("rejects mismatched passwords", () => {
      const result = passwordResetSchema.safeParse({
        token: "a".repeat(64),
        newPassword: "MyStr0ngP@ss",
        confirmPassword: "DifferentP@ss1",
      });
      assert.equal(result.success, false);
    });

    it("rejects unknown fields with .strict()", () => {
      const result = passwordResetSchema.safeParse({
        token: "a".repeat(64),
        newPassword: "MyStr0ngP@ss",
        confirmPassword: "MyStr0ngP@ss",
        unknownField: "should be rejected",
      });
      assert.equal(result.success, false);
    });
  });
});
