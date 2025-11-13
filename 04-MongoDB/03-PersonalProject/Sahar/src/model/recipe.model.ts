import mongoose, { Document, model, Schema } from "mongoose";

export interface Irecipe extends Document {
  title: string;
  description: string;
  instructions: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  imageUrl?: string;
  user: string;
}

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  ],
  imageUrl: { type: String, required: false },
});

const Recipe = model<Irecipe>("Recipe", recipeSchema);
export default Recipe;
