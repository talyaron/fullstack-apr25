import * as v from 'valibot';
import { ResultsSettingsSchema } from './resultsSettings.schema';

export const TaskCreateSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1), v.maxLength(200)),
  description: v.optional(v.pipe(v.string(), v.maxLength(2000)), ''),
  priority: v.optional(v.picklist(['low', 'medium', 'high']), 'medium'),
  dueDate: v.optional(v.string()),
  status: v.optional(v.picklist(['pending', 'in-progress', 'completed']), 'pending'),
  settings: v.optional(ResultsSettingsSchema),
});

export const TaskUpdateSchema = v.partial(TaskCreateSchema);

export const TaskResponseSchema = v.object({
  _id: v.string(),
  title: v.string(),
  description: v.string(),
  priority: v.picklist(['low', 'medium', 'high']),
  dueDate: v.optional(v.string()),
  status: v.picklist(['pending', 'in-progress', 'completed']),
  settings: v.optional(ResultsSettingsSchema),
  userId: v.string(),
  createdAt: v.string(),
  updatedAt: v.string(),
});

export const TaskIdParamSchema = v.object({
  id: v.pipe(v.string(), v.minLength(24), v.maxLength(24)),
});

export type TaskCreate = v.InferOutput<typeof TaskCreateSchema>;
export type TaskUpdate = v.InferOutput<typeof TaskUpdateSchema>;
export type TaskResponse = v.InferOutput<typeof TaskResponseSchema>;
export type TaskIdParam = v.InferOutput<typeof TaskIdParamSchema>;
