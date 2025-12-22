import { Request, Response, NextFunction } from 'express';
import * as v from 'valibot';

export const validateBody = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = v.safeParse(schema, req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.issues.map(issue => ({
          path: issue.path?.map(p => p.key).join('.') || 'unknown',
          message: issue.message,
        })),
      });
      return;
    }
    req.body = result.output;
    next();
  };
};

export const validateParams = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = v.safeParse(schema, req.params);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid parameters',
        errors: result.issues.map(issue => ({
          path: issue.path?.map(p => p.key).join('.') || 'unknown',
          message: issue.message,
        })),
      });
      return;
    }
    req.params = result.output as typeof req.params;
    next();
  };
};
