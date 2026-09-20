import { z } from 'zod';
import { isPasswordStrong } from '@deploycore/security';

const strongPassword = z.string().refine(
  (val) => isPasswordStrong(val).valid,
  {
    message:
      'Password must be at least 8 characters with uppercase, lowercase, and digit',
  }
);

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;

export const emailVerificationSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
  })
  .strict();

export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;

export const passwordResetRequestSchema = z
  .object({
    email: z.string().email('Invalid email format'),
  })
  .strict();

export type PasswordResetRequestInput = z.infer<
  typeof passwordResetRequestSchema
>;

export const passwordResetSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    newPassword: strongPassword,
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
