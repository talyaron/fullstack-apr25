import { Schema, model, InferSchemaType } from 'mongoose';

const EventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    seats: { type: Number, required: true, min: 1, max: 5000 },
    tags: [{ type: String, trim: true, lowercase: true }],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

EventSchema.index({ title: 'text', location: 'text', tags: 1 });

export type EventDoc = InferSchemaType<typeof EventSchema>;
export default model<EventDoc>('Event', EventSchema);
