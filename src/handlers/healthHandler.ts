import { Request, Response } from 'express';
import { HealthResponse } from '../types/todo.js';

export async function healthCheckHandler(req: Request, res: Response): Promise<void> {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
}
