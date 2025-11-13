import { Schema, model } from "mongoose";

export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
}


const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = model("User", userSchema);