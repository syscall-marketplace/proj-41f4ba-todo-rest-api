import { Request, Response, NextFunction } from 'express';

export function validateCreateTodo(req: Request, res: Response, next: NextFunction): void {
  const { title, completed } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({ error: 'Validation error', message: 'Title is required and must be a non-empty string' });
    return;
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Validation error', message: 'Completed must be a boolean' });
    return;
  }

  next();
}

export function validateUpdateTodo(req: Request, res: Response, next: NextFunction): void {
  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    res.status(400).json({ error: 'Validation error', message: 'Title must be a non-empty string' });
    return;
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Validation error', message: 'Completed must be a boolean' });
    return;
  }

  next();
}
