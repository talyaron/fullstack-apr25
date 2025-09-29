export interface User{
    id:string;
    name:string;
    email:string;
    password:string;
}
import { model, Schema } from "mongoose";
export const userSchema = new Schema({
    id:{type: String, required: true},
    name:{type:String,  required: true},
    email:{type:String,  required: true},
    password:{type:String,  required: true}
})
export const IUser = model('User', userSchema)
