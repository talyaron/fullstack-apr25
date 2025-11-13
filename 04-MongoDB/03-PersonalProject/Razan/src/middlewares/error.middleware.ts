import { Request, Response, NextFunction } from 'express';

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Unexpected error',
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
  };
  res.status(status).json(payload);
}
