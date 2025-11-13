import { Document, model, Schema } from "mongoose";

export interface Recipe extends Document {
    name: string;
    ingredients: string[];
    instructions: string;
    amountRanks?: number;
    rank?: number;
    categoryId: string;
    creatorId: string;
}

export const recipeSchema = new Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    amountRanks: { type: Number, required: false, default: 0 },
    rank: { type: Number, required: false, default: 0 },
    categoryId: { type: String, required: true, ref: 'Category' },
    creatorId: { type: String, required: true, ref: 'User' }
})

export const IRecipe = model('Recipe', recipeSchema)

