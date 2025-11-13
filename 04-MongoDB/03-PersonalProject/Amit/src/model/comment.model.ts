import { Schema, model, Types } from "mongoose"

export type Comment = {
    _id: string;
    factId: Types.ObjectId;
    userId: Types.ObjectId;
    text: string;
};

const commentSchema = new Schema<Comment>({
    factId: { type: Schema.Types.ObjectId, ref: "Fact", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
}, { timestamps: true });

export const CommentModel = model<Comment>("Comment", commentSchema);