import { Document, model, Schema } from "mongoose";
export interface Favorite extends Document {
   userId: string;
   recipeId: string;
}

export const favoriteSchema = new Schema({
    recipeId: { type: String, required: true, ref: 'Recipe' },
    userId:{type:String,  required: true, ref:'User' }
})
export const IFavorite = model('Favorite', favoriteSchema)
