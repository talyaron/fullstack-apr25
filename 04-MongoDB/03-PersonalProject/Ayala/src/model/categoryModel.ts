export interface Category{
    id:string;
    name:string;
}

import { model, Schema } from "mongoose";
export const categorySchema = new Schema({
    id:{type: String, required: true},
    name:{type:String,  required: true}
})
export const ICategory = model('Category', categorySchema)

