import mongoose, { Document, model, Schema } from "mongoose";

export interface Iuser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema<Iuser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
  },
});

const User = model<Iuser>("User", userSchema);
export default User;
