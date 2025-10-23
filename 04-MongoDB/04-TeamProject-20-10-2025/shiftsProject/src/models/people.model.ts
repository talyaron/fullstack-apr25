import mongoose, { Document, model, Schema } from "mongoose";
export interface Ipeople extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  personId: number;
  controlCenter: string;
}

const peopleSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  personId: { type: Number, required: true, unique: true },
  controlCenter: { type: Number, required: true },
});

const People = model <Ipeople>("People",peopleSchema,"people");
export default People;
