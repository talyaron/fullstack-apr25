import { Document, model, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}
export const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})
export const IUser = model('User', userSchema)
