import { Schema, model } from "mongoose";

export type Word = {
  _id: string;
  word: string;
};

const wordSchema = new Schema<Word>({
  word: { type: String, required: true, unique: true, trim: true },
});

export const wordModel = model("Word", wordSchema);
