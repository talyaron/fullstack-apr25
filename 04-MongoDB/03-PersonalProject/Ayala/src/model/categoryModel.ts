import { Document, model, Schema } from "mongoose";

export interface Category extends Document {
    name: string;
}


export const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})
export const ICategory = model('Category', categorySchema)

