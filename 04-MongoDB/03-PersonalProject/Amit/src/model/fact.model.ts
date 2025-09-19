import { Schema, model } from "mongoose";

export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export type Fact = {
    _id: string;
    title: string;
    description: string;
    category: string;
}

const FactSchema = new Schema<Fact>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


export const FactModel = model("Fact", FactSchema);
export const UserModel = model("User", userSchema);