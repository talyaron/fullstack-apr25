import { Request, Response, NextFunction } from 'express';
import { listEvents, createEvent, getEvent, updateEvent, removeEvent } from '../services/event.service';

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await listEvents(req.query.q as string | undefined);
    res.json(events);
  } catch (e) { next(e); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json(event);
  } catch (e) { next(e); }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
  } catch (e) { next(e); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await updateEvent(req.params.id, req.body);
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
  } catch (e) { next(e); }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeEvent(req.params.id);
    res.status(204).end();
  } catch (e) { next(e); }
};
