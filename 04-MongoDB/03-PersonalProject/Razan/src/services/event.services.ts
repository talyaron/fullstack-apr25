import Event from '../model/Event';

export const listEvents = async (q?: string) => {
  if (q) {
    return Event.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' }, date: 1 });
  }
  return Event.find().sort({ date: 1 });
};

export const createEvent = async (payload: Partial<{
  title: string; date: string | Date; location: string; seats: number;
  tags: string[]; notes?: string;
}>) => {
  return Event.create(payload);
};

export const getEvent = (id: string) => Event.findById(id);
export const updateEvent = (id: string, data: Partial<Event>) =>
  Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const removeEvent = (id: string) => Event.findByIdAndDelete(id);
