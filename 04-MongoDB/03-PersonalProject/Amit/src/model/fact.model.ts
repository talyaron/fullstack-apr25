import { Schema, Types, model } from "mongoose";

export type Fact = {
    _id: string;
    title: string;
    description: string;
    source: string;
    category: string;
    userId: Types.ObjectId;
}

const FactSchema = new Schema<Fact>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const FactModel = model("Fact", FactSchema);
