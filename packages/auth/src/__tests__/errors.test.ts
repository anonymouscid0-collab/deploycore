import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AuthError,
  InvalidCredentialsError,
  SessionExpiredError,
  InvalidTokenError,
  EmailAlreadyExistsError,
  WeakPasswordError,
} from "../index";

describe("errors", () => {
  describe("AuthError", () => {
    it("is an instance of Error", () => {
      const error = new AuthError("Test error", 400, "TEST_ERROR");
      assert.ok(error instanceof Error);
    });

    it("has correct statusCode", () => {
      const error = new AuthError("Test error", 400, "TEST_ERROR");
      assert.equal(error.statusCode, 400);
    });

    it("has correct code", () => {
      const error = new AuthError("Test error", 400, "TEST_ERROR");
      assert.equal(error.code, "TEST_ERROR");
    });

    it("has correct message", () => {
      const error = new AuthError("Test error", 400, "TEST_ERROR");
      assert.equal(error.message, "Test error");
    });

    it("has correct name", () => {
      const error = new AuthError("Test error", 400, "TEST_ERROR");
      assert.equal(error.name, "AuthError");
    });
  });

  describe("InvalidCredentialsError", () => {
    it("is an instance of AuthError", () => {
      assert.ok(new InvalidCredentialsError() instanceof AuthError);
    });

    it("has correct properties", () => {
      const error = new InvalidCredentialsError();
      assert.equal(error.statusCode, 401);
      assert.equal(error.code, "INVALID_CREDENTIALS");
      assert.equal(error.message, "Invalid email or password");
      assert.equal(error.name, "InvalidCredentialsError");
    });
  });

  describe("SessionExpiredError", () => {
    it("is an instance of AuthError", () => {
      assert.ok(new SessionExpiredError() instanceof AuthError);
    });

    it("has correct properties", () => {
      const error = new SessionExpiredError();
      assert.equal(error.statusCode, 401);
      assert.equal(error.code, "SESSION_EXPIRED");
      assert.equal(error.message, "Session expired");
      assert.equal(error.name, "SessionExpiredError");
    });
  });

  describe("InvalidTokenError", () => {
    it("is an instance of AuthError", () => {
      assert.ok(new InvalidTokenError() instanceof AuthError);
    });

    it("has correct properties", () => {
      const error = new InvalidTokenError();
      assert.equal(error.statusCode, 400);
      assert.equal(error.code, "INVALID_TOKEN");
      assert.equal(error.message, "Invalid or expired token");
      assert.equal(error.name, "InvalidTokenError");
    });
  });

  describe("EmailAlreadyExistsError", () => {
    it("is an instance of AuthError", () => {
      assert.ok(new EmailAlreadyExistsError() instanceof AuthError);
    });

    it("has correct properties", () => {
      const error = new EmailAlreadyExistsError();
      assert.equal(error.statusCode, 409);
      assert.equal(error.code, "EMAIL_ALREADY_EXISTS");
      assert.equal(error.message, "Registration failed");
      assert.equal(error.name, "EmailAlreadyExistsError");
    });
  });

  describe("WeakPasswordError", () => {
    it("is an instance of AuthError", () => {
      assert.ok(new WeakPasswordError(["Too short"]) instanceof AuthError);
    });

    it("has correct properties", () => {
      const error = new WeakPasswordError(["Too short", "No uppercase"]);
      assert.equal(error.statusCode, 400);
      assert.equal(error.code, "WEAK_PASSWORD");
      assert.equal(
        error.message,
        "Password too weak: Too short, No uppercase"
      );
      assert.equal(error.name, "WeakPasswordError");
    });
  });
});
