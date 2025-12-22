import * as v from 'valibot';

export const UserRegisterSchema = v.object({
  username: v.pipe(v.string(), v.minLength(3), v.maxLength(30)),
  password: v.pipe(v.string(), v.minLength(6), v.maxLength(100)),
});

export const UserLoginSchema = v.object({
  username: v.pipe(v.string(), v.minLength(1)),
  password: v.pipe(v.string(), v.minLength(1)),
});

export const UserResponseSchema = v.object({
  _id: v.string(),
  username: v.string(),
  createdAt: v.string(),
});

export type UserRegister = v.InferOutput<typeof UserRegisterSchema>;
export type UserLogin = v.InferOutput<typeof UserLoginSchema>;
export type UserResponse = v.InferOutput<typeof UserResponseSchema>;
