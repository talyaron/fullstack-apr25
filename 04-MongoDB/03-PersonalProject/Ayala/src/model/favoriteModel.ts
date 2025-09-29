export interface Favorite{
    id:string;
   recipeId:string;
   userId:string;
}

import { model, Schema } from "mongoose";
export const favoriteSchema = new Schema({
    id:{type: String, required: true},
    recipeId:{type:String,  required: true},
    userId:{type:String,  required: true}
})
export const IFavorite = model('Favorite', favoriteSchema)
