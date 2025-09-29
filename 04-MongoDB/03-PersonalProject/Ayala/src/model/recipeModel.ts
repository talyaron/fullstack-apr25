export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    amountRanks: number;
    rank: number;
    categoryId: string;
    creatorId: string;
}

import { model, Schema } from "mongoose";
export const recipeSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    amountRanks: { type: Number, required: true },
    rank: { type: Number, required: true },
    categoryId: { type: String, required: true },
    creatorId: { type: String, required: true }
})

export const IRecipe = model('Recipe', recipeSchema)

