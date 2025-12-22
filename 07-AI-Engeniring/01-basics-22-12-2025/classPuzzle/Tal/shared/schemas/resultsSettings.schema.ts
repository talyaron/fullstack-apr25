import * as v from 'valibot';

export const ResultsSettingsSchema = v.object({
  resultsBy: v.optional(v.picklist(['priority', 'dueDate', 'createdAt']), 'createdAt'),
  cutoffNumber: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(100)), 10),
  cutoffBy: v.optional(v.picklist(['count', 'date']), 'count'),
  sortOrder: v.optional(v.picklist(['asc', 'desc']), 'desc'),
});

export type ResultsSettings = v.InferOutput<typeof ResultsSettingsSchema>;
