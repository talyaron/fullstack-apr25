import { Schema, model, Types } from "mongoose";

export type Data = {
  _id: string;
  userId: Types.ObjectId;
  amountOfGames: number;
  amountOfVictories: number;
};

const dataSchema = new Schema<Data>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amountOfGames: { type: Number, required: true, default: 0 },
  amountOfVictories: { type: Number, required: true, default: 0 },
});

export const dataModel = model("Data", dataSchema);
