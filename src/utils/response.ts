import { Response } from 'express';
import { ErrorResponse } from '../types/todo.js';

export const sendError = (res: Response, status: number, error: string, message?: string): Response<ErrorResponse> => {
  return res.status(status).json({ error, message });
};

export const sendSuccess = <T>(res: Response, status: number, data: T): Response<T> => {
  return res.status(status).json(data);
};