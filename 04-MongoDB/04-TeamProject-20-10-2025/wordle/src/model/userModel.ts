import { Schema, model } from "mongoose";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
